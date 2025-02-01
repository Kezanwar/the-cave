package handlers

import (
	"TheCave/api/output"
	"TheCave/models/avatar"
	"TheCave/services/validate"
	"encoding/json"
	"fmt"
	"net/http"
)

type CreateAvatarReqBody struct {
	Name        string `json:"name"`
	HairColor   string `json:"hair_color"`
	TopColor    string `json:"top_color"`
	BottomColor string `json:"bottom_color"`
}

func (r *CreateAvatarReqBody) validate() error {

	if !validate.StrNotEmpty(r.Name, r.HairColor, r.TopColor, r.BottomColor) {
		return fmt.Errorf("Request body invalid")
	}

	return nil
}

func Post_Avatar_Create(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	req := &CreateAvatarReqBody{}

	err := json.NewDecoder(r.Body).Decode(req)

	if err != nil {
		return http.StatusBadRequest, err
	}

	err = req.validate()

	if err != nil {
		return http.StatusBadRequest, err
	}

	_, err = avatar.Create(r.Context(), req.Name, req.HairColor, req.TopColor, req.BottomColor)

	if err != nil {
		return http.StatusBadRequest, err
	}

	return output.SuccessResponse(w, r, &output.MessageResponse{Message: "hello get users"})
}
