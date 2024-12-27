package api

import (
	"encoding/json"
	"fmt"

	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/joho/godotenv/autoload"
)

type APIServer struct {
}

type ApiHandler func(http.ResponseWriter, *http.Request) (int, error)

type EmptyResponse struct {
	Message string `json:"message"`
}

var NilError = 0

/*
if an endpoint will only return json wrap the handler with this,
then on success you must return NilError, s.write_json(success..) yourself but any errors can just
return code, err and will be handled by this.
*/
func (s *APIServer) MakeJsonHandler(f ApiHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		code, err := f(w, r)

		if err != nil {
			var c = http.StatusInternalServerError
			if code != NilError {
				c = code
			}
			s.WriteJson(w, r, c, EmptyResponse{Message: err.Error()})
		}

	}
}

func (s *APIServer) WriteJson(w http.ResponseWriter, r *http.Request, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

func (s *APIServer) Router() *mux.Router {
	router := mux.NewRouter()
	router.Use(Cors)
	router.HandleFunc("/", s.MakeJsonHandler(s.test))
	return router

}

func (s *APIServer) test(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	fmt.Println("hi")

	if r.Method == "GET" {

		return NilError, s.WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello world"})
	} else {
		return http.StatusBadRequest, fmt.Errorf("method not allow %s", r.Method)
	}
}
