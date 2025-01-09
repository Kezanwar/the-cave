package middleware

import (
	"TheCave/api/handlers"
	"net/http"
)

var AUTH_TOKEN_HEADER = "x-auth"

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := r.Header.Get(AUTH_TOKEN_HEADER)
		if len(token) == 0 {
			handlers.WriteJson(w, r, http.StatusNetworkAuthenticationRequired, handlers.EmptyResponse{Message: "auth token required"})
		}
		next.ServeHTTP(w, r)
	})
}
