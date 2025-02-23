package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"

	"github.com/gorilla/mux"
)

func Rooms(r *mux.Router) {
	Route(r, "/meta", handlers.Get_Rooms_Meta, middleware.Auth).Methods("GET", "OPTIONS")
}
