package routes

import (
	"crypto/sha1"
	"database/sql"
	"errors"
	"fmt"
	"log"
	"net/http"
	"net/url"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/incrementing-integers-service/server/http_helper"
	postgres "github.com/incrementing-integers-service/server/models"
	"github.com/incrementing-integers-service/server/models/user"
	"github.com/lib/pq"
)

var (
	// ErrorMissingInput is a default message when a request does not have all inputs required
	ErrorMissingInput = errors.New("missing fields required")
)

// Handler is the DB handler
type Handler struct {
	Db *postgres.DB
}

//GetFunc Declare signature for all GetOne calls to the DB
type GetFunc func(db *postgres.DB, id int) (interface{}, error)

//GetManyFunc Declare signature for all GetListByRepoId calls to the DB
type GetManyFunc func(db *postgres.DB) ([]interface{}, error)

//GetManyByIDFunc Declare signature for all GetListByModelId calls to the DB
type GetManyByIDFunc func(db *postgres.DB, id int) ([]interface{}, error)

//DeleteFunc Declare signature for all Delete calls to the DB
type DeleteFunc func(db *postgres.DB, deleteSql string, id int) error

//DefaultHTTPHandler Declare signature for http handler
type DefaultHTTPHandler func(w http.ResponseWriter, r *http.Request)

//NewRoutingHandler creates a new Router Handler
func NewRoutingHandler(db *postgres.DB) *Handler {
	return &Handler{db}
}

// Sha1 (Secure Hash Algorithm 1) is a cryptographic hash function which takes an input and produces a 160-bit (20-byte) hash value known as a message digest – typically rendered as a hexadecimal number, 40 digits long.
func Sha1(a string) string {
	h := sha1.New()
	hStr := fmt.Sprintf("%s", a)
	h.Write([]byte(hStr))
	return fmt.Sprintf("%x\n", h.Sum(nil))
}

// GetListByIDCB is a callback function which passes the DB payload to the routes handler
func (h *Handler) GetListByIDCB(getManyByID GetManyByIDFunc) DefaultHTTPHandler {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		if _, ok := params["id"]; !ok {
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
			return
		}
		id, err := strconv.Atoi(params["id"])
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
			return
		}
		arr, err := getManyByID(h.Db, id)
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
			return
		}
		if len(arr) < 1 {
			http_helper.ReturnResponseMsg(w, http.StatusOK, []string{})
			return
		}
		http_helper.ReturnResponseMsg(w, http.StatusOK, arr)
	}
}

// DeleteRequestCB is a callback function which deletes the DB payload to the routes handler
func (h *Handler) DeleteRequestCB(deleteOne DeleteFunc, sql string) DefaultHTTPHandler {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		if _, ok := params["id"]; !ok {
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
			return
		}
		id, err := strconv.Atoi(params["id"])
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
			return
		}
		err = deleteOne(h.Db, sql, id)
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
			return
		}
		http_helper.ReturnResponseMsg(w, http.StatusOK, "")
	}
}

// GetRequestCB is a callback function which passes the DB payload to the routes handler
func (h *Handler) GetRequestCB(getOne GetFunc) DefaultHTTPHandler {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		if _, ok := params["id"]; !ok {
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
			return
		}
		id, err := strconv.Atoi(params["id"])
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
			return
		}
		model, err := getOne(h.Db, id)
		if err != nil {
			if err == sql.ErrNoRows {
				http_helper.ReturnResponseMsg(w, http.StatusOK, struct{}{})
				return
			}
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
			return
		}
		http_helper.ReturnResponseMsg(w, http.StatusOK, model)
	}
}

// GetListRequestCB is a callback function which passes the DB payload to the routes handler
func (h *Handler) GetListRequestCB(getMany GetManyFunc) DefaultHTTPHandler {
	return func(w http.ResponseWriter, r *http.Request) {
		modelArr, err := getMany(h.Db)
		if err != nil {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
			return
		}
		if len(modelArr) < 1 {
			http_helper.ReturnResponseMsg(w, http.StatusOK, []string{})
			return
		}
		http_helper.ReturnResponseMsg(w, http.StatusOK, modelArr)
	}
}

func haveRequiredFormInputs(reqBody url.Values, expected ...string) bool {
	for _, val := range expected {
		if _, ok := reqBody[val]; !ok {
			return false
		}
	}
	return true
}

// AddUser add a user to the DB
func (h *Handler) AddUser(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	if !haveRequiredFormInputs(r.Form, "firstName", "lastName", "sapId", "email") {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
		return
	}
	email := r.Form["email"][0]
	password := r.Form["password"][0]
	intValue, errParse := strconv.Atoi(r.Form["intValue"][0])
	if errParse != nil {
		log.Println(errParse)
		return
	}
	u := &user.User{Email: email, Password: password, IntValue: intValue}
	uid, err := user.Create(h.Db, u)
	if err != nil {
		log.Println(err)
		if err.(*pq.Error).Code == "23505" {
			http_helper.ReturnResponseMsg(w, http.StatusConflict, postgres.ErrorAlreadyExists.Error())
			return
		}
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
		return
	}
	http_helper.ReturnResponseMsg(w, http.StatusCreated, uid)
}

// NextInteger returns an user integer +1
func (h *Handler) NextInteger(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	if _, ok := params["id"]; !ok {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
		return
	}
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
		return
	}
	nextInteger, err := user.NextInteger(h.Db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorNotFound.Error())
			return
		}
		log.Println(err)
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
		return
	}
	http_helper.ReturnResponseMsg(w, http.StatusOK, nextInteger)
}

// CurrentInteger returns an user integer +1
func (h *Handler) CurrentInteger(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	if _, ok := params["id"]; !ok {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
		return
	}
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
		return
	}
	currentInteger, err := user.CurrentInteger(h.Db, id)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorNotFound.Error())
			return
		}
		log.Println(err)
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
		return
	}
	http_helper.ReturnResponseMsg(w, http.StatusOK, currentInteger)
}

// UpdateInteger updates a user integer value in the DB
func (h *Handler) UpdateInteger(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	if _, ok := params["id"]; !ok {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
		return
	}
	r.ParseForm()
	if !haveRequiredFormInputs(r.Form, "current") {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorMissingFields.Error())
		return
	}
	id, err := strconv.Atoi(params["id"])
	if err != nil {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
		return
	}
	current, err := strconv.Atoi(r.Form["current"][0])
	if err != nil {
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorBadFields.Error())
		return
	}
	_, err = user.UpdateInteger(h.Db, id, current)
	if err != nil {
		if err == sql.ErrNoRows {
			log.Println(err)
			http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorNotFound.Error())
			return
		}
		log.Println(err)
		http_helper.ReturnResponseMsg(w, http.StatusBadRequest, postgres.ErrorCannotFulfilRequest.Error())
		return
	}
	http_helper.ReturnResponseMsg(w, http.StatusOK, current)
}
