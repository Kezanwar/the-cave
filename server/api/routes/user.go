package routes

import (
	"TheCave/api/handlers"

	"github.com/gorilla/mux"
)

func User(r *mux.Router) {
	Route(r, "/", handlers.GetUsers).Methods("GET", "OPTIONS")
}
