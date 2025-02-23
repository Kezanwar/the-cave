package handlers

import (
	"TheCave/api/output"
	"TheCave/models/avatar"
	"TheCave/models/user"
	"TheCave/services/jwt"
	"TheCave/services/validate"

	"encoding/json"
	"fmt"
	"net/http"
)

type ManualAuthResp struct {
	User   *user.ToClient   `json:"user"`
	Avatar *avatar.ToClient `json:"avatar"`
	Token  string           `json:"token"`
}
type AutoAuthResp struct {
	User   *user.ToClient   `json:"user"`
	Avatar *avatar.ToClient `json:"avatar"`
}

type RegisterReqBody struct {
	FirstName string `json:"first_name"`
	LastName  string `json:"last_name"`
	Email     string `json:"email"`
	Password  string `json:"password"`
}

func (s *RegisterReqBody) validate() error {

	if !validate.StrNotEmpty(s.FirstName, s.LastName, s.Email, s.Password) {
		return fmt.Errorf("Request body invalid")
	}

	return nil
}

func Post_Auth_Register(w http.ResponseWriter, r *http.Request) (int, error) {
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
		return http.StatusBadRequest, fmt.Errorf("This email already exists")
	}

	usr, err := user.Create(r.Context(), req.FirstName, req.LastName, req.Email, req.Password)

	if err != nil {
		return http.StatusBadRequest, err
	}

	tkn, err := jwt.Create(jwt.Keys.UUID, usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	return output.SuccessResponse(w, r, &ManualAuthResp{
		User:   usr.ToClient(),
		Avatar: nil,
		Token:  tkn,
	})
}

type SignInReqBody struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func (s *SignInReqBody) validate() error {

	if !validate.StrNotEmpty(s.Email, s.Password) {
		return fmt.Errorf("Request body invalid")
	}

	return nil
}
func Post_Auth_SignIn(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	req := &SignInReqBody{}

	err := json.NewDecoder(r.Body).Decode(req)

	if err != nil {
		return http.StatusBadRequest, err
	}

	err = req.validate()

	if err != nil {
		return http.StatusBadRequest, err
	}

	usr, err := user.GetByEmail(r.Context(), req.Email)

	if err != nil {
		return http.StatusBadRequest, err
	}

	if !usr.IsPassword(req.Password) {
		return http.StatusBadRequest, fmt.Errorf("Incorrect password")
	}

	tkn, err := jwt.Create(jwt.Keys.UUID, usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	av, err := avatar.GetUsersAvatar(r.Context(), usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	var av_resp *avatar.ToClient

	if av != nil {
		av_resp = av.ToClient()
	}

	return output.SuccessResponse(w, r, &ManualAuthResp{
		User:   usr.ToClient(),
		Avatar: av_resp,
		Token:  tkn,
	})
}

func Get_Auth_Initialize(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	usr, err := GetUserFromCtx(r)

	if err != nil {
		return http.StatusBadRequest, err
	}

	av, err := avatar.GetUsersAvatar(r.Context(), usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	var av_resp *avatar.ToClient

	if av != nil {
		av_resp = av.ToClient()
	}

	return output.SuccessResponse(w, r, &AutoAuthResp{
		User:   usr.ToClient(),
		Avatar: av_resp,
	})
}
