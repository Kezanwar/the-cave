package middleware

import (
	"net/http"

	"github.com/rs/cors"
)

var corsOptions = cors.New(cors.Options{
	AllowedOrigins:   []string{"localhost:5173"},
	AllowedHeaders:   []string{"Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token", "Authorization"},
	AllowedMethods:   []string{"GET", "PATCH", "POST", "PUT", "OPTIONS", "DELETE"},
	AllowCredentials: true,
})

func Cors(next http.Handler) http.Handler {
	return corsOptions.Handler(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
		} else {
			next.ServeHTTP(w, r)
		}
	}))
}
