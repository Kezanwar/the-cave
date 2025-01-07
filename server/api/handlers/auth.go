package handlers

import (
	"fmt"
	"net/http"
)

func PostAuthRegister(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	fmt.Println("hi")

	if r.Method == "POST" {

		return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello post register"})
	} else {
		return http.StatusBadRequest, fmt.Errorf("method not allow %s", r.Method)
	}
}
