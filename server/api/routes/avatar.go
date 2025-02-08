package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"

	"github.com/gorilla/mux"
)

func Avatar(r *mux.Router) {
	Route(r, "/", handlers.Post_Avatar, middleware.Auth).Methods("POST")
	Route(r, "/", handlers.Get_Avatar, middleware.Auth).Methods("GET")
}
