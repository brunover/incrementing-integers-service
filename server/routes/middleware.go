package routes

import (
	"net/http"
)

// TestToken is used to fake an authorization
var TestToken string

// JSONHeaderMiddleware sets a JSON Header to the request before passing it foward
func JSONHeaderMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Do stuff here
		w.Header().Set("Content-Type", "application/json")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(w, r)
	})
}
