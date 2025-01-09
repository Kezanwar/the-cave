package handlers

import (
	"TheCave/models/user"
	"TheCave/services/jwt"

	"encoding/json"
	"fmt"
	"net/http"
)

type RegisterReqBody struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func (s *RegisterReqBody) validate() error {
	if !StrNotNil(s.FirstName) || !StrNotNil(s.LastName) || !StrNotNil(s.Email) || !StrNotNil(s.Password) {
		return fmt.Errorf("request body invalid")
	}
	return nil
}

type RegisterResp struct {
	User  user.ToClient `json:"user"`
	Token string        `json:"token"`
}

func PostAuthRegister(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	req := &RegisterReqBody{}

	err := json.NewDecoder(r.Body).Decode(req)

	if err != nil {
		return http.StatusBadRequest, err
	}

	err = req.validate()

	if err != nil {
		return http.StatusBadRequest, err
	}

	exists, err := user.DoesEmailExist(r.Context(), req.Email)

	if err != nil {
		return http.StatusBadRequest, err
	}

	if exists {
		return http.StatusBadRequest, fmt.Errorf("this email already exists")
	}

	usr, err := user.Create(r.Context(), req.FirstName, req.LastName, req.Email, req.Password)

	if err != nil {
		return http.StatusBadRequest, err
	}

	tkn, err := jwt.Create(jwt.Keys.UUID, usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	return NilError, WriteJson(w, r, http.StatusOK, &RegisterResp{User: *usr.ToClient(), Token: tkn})
}

func GetAuthInitialize(w http.ResponseWriter, r *http.Request) (int, error) {

	defer r.Body.Close()

	return NilError, WriteJson(w, r, http.StatusOK, &EmptyResponse{Message: "hello post register"})
}
