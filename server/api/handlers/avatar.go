package handlers

import (
	"TheCave/api/output"
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
	if !StrNotNil(r.Name) || !StrNotNil(r.HairColor) || !StrNotNil(r.BottomColor) || !StrNotNil(r.TopColor) {
		return fmt.Errorf("request body invalid")
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

	return output.SuccessResponse(w, r, &output.MessageResponse{Message: "hello get users"})
}
