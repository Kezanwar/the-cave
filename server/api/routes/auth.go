package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"

	"github.com/gorilla/mux"
)

func Auth(r *mux.Router) {
	Route(r, "/register", handlers.PostAuthRegister).Methods("POST")
	Route(r, "/initialize", handlers.GetAuthInitialize, middleware.Auth).Methods("GET")
}
