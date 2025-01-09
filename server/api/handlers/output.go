package handlers

import (
	"encoding/json"
	"net/http"
)

type EmptyResponse struct {
	Message string `json:"message"`
}

var NilError = 0

type ApiHandler func(http.ResponseWriter, *http.Request) (int, error)

/*
if an endpoint will only return json wrap the handler with this,
then on success you must return NilError, s.write_json(success..) yourself but any errors can just
return code, err and will be handled by this.
*/
func MakeJsonHandler(f ApiHandler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		code, err := f(w, r)

		if err != nil {
			var c = http.StatusInternalServerError
			if code != NilError {
				c = code
			}
			WriteJson(w, r, c, EmptyResponse{Message: err.Error()})
		}

	}
}

func WriteJson(w http.ResponseWriter, r *http.Request, status int, v any) error {
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}
