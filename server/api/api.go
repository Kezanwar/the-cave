package api

import (
	"TheCave/api/routes"

	"github.com/gorilla/mux"
)

func RegisterRoutes(r *mux.Router) {
	routes.SubRouter(r, "/auth", routes.Auth)
	routes.SubRouter(r, "/users", routes.User)
	routes.SubRouter(r, "/avatar", routes.Avatar)
}
