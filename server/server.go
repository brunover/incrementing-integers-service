package main

import (
	"crypto/tls"
	"flag"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/incrementing-integers-service/server/http_helper"
	postgres "github.com/incrementing-integers-service/server/models"
	"github.com/incrementing-integers-service/server/models/user"
	"github.com/incrementing-integers-service/server/routes"
	"github.com/lib/pq"
	_ "github.com/lib/pq"
	"gopkg.in/src-d/go-git.v4/plumbing/transport/client"
	gitHttp "gopkg.in/src-d/go-git.v4/plumbing/transport/http"
)

// func basicAuthMiddleware(fn http.HandlerFunc) http.HandlerFunc {
// 	return func(w http.ResponseWriter, r *http.Request) {
// 		w.Header().Set("WWW-Authenticate", `Basic realm="Restricted"`)
// 		user, pass, _ := r.BasicAuth()
// 		if user != os.Getenv("ADMIN_USER") || pass != os.Getenv("ADMIN_PASSWORD") {
// 			http.Error(w, "Unauthorized.", http.StatusUnauthorized)
// 			return
// 		}
// 		fn(w, r)
// 	}
// }

// SeedDb populates DB with initial informations
func SeedDb(db *postgres.DB) {
	iUsers, err := user.GetList(db)
	if len(iUsers) < 1 {
		err = user.SeedUser(db)
		if err != nil && err.(*pq.Error).Code != pq.ErrorCode(23505) {
			log.Fatal("could not seed user table in db")
		}
	}
}

// Set up and start http server
func main() {
	devMode := flag.Bool("dev", false, "Uses local dev settings")
	flag.Parse()

	if *devMode {
		log.Println("Server started in dev mode")
		httpClient := &http.Client{
			Timeout: time.Second * 10,
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
			},
		}
		// Install it as default client for http URLs.
		client.InstallProtocol("http", gitHttp.NewClient(httpClient))
	}
	var dbConn = postgres.OpenConnection()

	// Seed DB with initial values
	SeedDb(dbConn)
	http := http_helper.NewHttp()

	routes.TestToken = os.Getenv("TEST_TOKEN")
	h := routes.NewRoutingHandler(dbConn)

	// Define common prefix
	sharedRouter := http.ApiServer.PathPrefix("/api/v1").Subrouter()
	sharedRouter.Use(routes.JSONHeaderMiddleware)

	// Users routes
	userRouter := sharedRouter.PathPrefix("/users").Subrouter()
	userRouter.HandleFunc("/fetch", h.GetUser).Methods("POST")
	userRouter.HandleFunc("/{id:[0-9]+}/next", h.NextInteger).Methods("GET")
	userRouter.HandleFunc("/{id:[0-9]+}/current", h.CurrentInteger).Methods("GET")
	userRouter.HandleFunc("/{id:[0-9]+}/current", h.UpdateInteger).Methods("PATCH")

	go http.StartApiServer(5678)

	select {} // block forever to prevent exiting
}
