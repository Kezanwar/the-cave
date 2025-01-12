package routes

import (
	"TheCave/api/middleware"
	"TheCave/api/output"
	"net/http"

	"github.com/gorilla/mux"
)

func SubRouter(r *mux.Router, path string, applyRoutes func(r *mux.Router)) {
	router := r.PathPrefix(path).Subrouter()
	applyRoutes(router)
}

func Route(
	r *mux.Router,
	path string,
	handler output.ApiHandler,
	middlewares ...middleware.Middleware,
) *mux.Route {

	var h http.Handler = output.MakeJsonHandler(handler)

	if len(middlewares) > 0 {
		// Wrap it in each middleware in turn
		for _, m := range middlewares {
			h = m(h)
		}
	}

	return r.Handle(path, h)
}
