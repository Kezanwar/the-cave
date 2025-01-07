package handlers

import (
	"net/http"
)

func PostAuthRegister(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello post register"})
}

func GetAuthInitialize(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello post register"})
}
