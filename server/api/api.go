package api

import (
	"TheCave/api/middleware"
	"TheCave/api/routes"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	r.Use(middleware.Cors)

	routes.SubRouter(r, "/auth", routes.Auth)
	routes.SubRouter(r, "/users", routes.User)

}
