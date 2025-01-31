package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"

	"github.com/gorilla/mux"
)

func Avatar(r *mux.Router) {
	Route(r, "/", handlers.Post_Avatar_Create, middleware.Auth).Methods("POST")
}
