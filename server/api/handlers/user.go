package handlers

import (
	"fmt"
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	if r.Method == "GET" {

		return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello get users"})
	} else {
		return http.StatusBadRequest, fmt.Errorf("method not allow %s", r.Method)
	}
}
