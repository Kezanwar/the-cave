package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"

	"github.com/gorilla/mux"
)

func Auth(r *mux.Router) {
	Route(r, "/register", handlers.Post_Auth_Register).Methods("POST", "OPTIONS")
	Route(r, "/sign-in", handlers.Post_Auth_SignIn).Methods("POST", "OPTIONS")
	Route(r, "/initialize", handlers.Get_Auth_Initialize, middleware.Auth).Methods("GET", "OPTIONS")
}
