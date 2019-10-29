package http_helper

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type HTTP struct {
	ApiServer *mux.Router
}

func ReturnResponseMsg(w http.ResponseWriter, status int, val interface{}) {
	enc := json.NewEncoder(w)
	w.WriteHeader(status)
	enc.Encode(val)
}

func NewHttp() *HTTP {
	return &HTTP{
		ApiServer: mux.NewRouter(),
	}
}

func (h *HTTP) StartApiServer(port int) {
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), h.ApiServer)
	log.Printf("Api server started on %d", port)
	if err != nil {
		log.Fatal(err)
	}
}
