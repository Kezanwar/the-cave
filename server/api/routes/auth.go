package routes

import (
	"TheCave/api/handlers"

	"github.com/gorilla/mux"
)

func Auth(r *mux.Router) {
	Route(r, "/register", handlers.PostAuthRegister).Methods("POST")
}
