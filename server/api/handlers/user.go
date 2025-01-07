package handlers

import (
	"net/http"
)

func GetUsers(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello get users"})

}
