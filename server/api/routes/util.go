package routes

import (
	"TheCave/api/handlers"

	"github.com/gorilla/mux"
)

func SubRouter(r *mux.Router, path string, applyRoutes func(r *mux.Router)) {
	router := r.PathPrefix(path).Subrouter()
	applyRoutes(router)
}

func Route(r *mux.Router, path string, f handlers.ApiHandler) *mux.Route {
	return r.HandleFunc(path, handlers.MakeJsonHandler(f))
}
