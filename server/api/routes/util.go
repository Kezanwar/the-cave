package routes

import (
	"TheCave/api/handlers"
	"TheCave/api/middleware"
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
	handler handlers.ApiHandler,
	middlewares ...middleware.Middleware,
) *mux.Route {

	var h http.Handler = handlers.MakeJsonHandler(handler)

	if len(middlewares) > 0 {
		// Wrap it in each middleware in turn
		for _, m := range middlewares {
			h = m(h)
		}
	}

	return r.Handle(path, h)
}
