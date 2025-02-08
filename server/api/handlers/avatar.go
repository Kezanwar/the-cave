package handlers

import (
	"TheCave/api/output"
	"TheCave/models/avatar"
	"TheCave/services/validate"
	"encoding/json"
	"fmt"
	"net/http"
)

type GetAvatarSuccessResponse struct {
	Avatar avatar.ToClient `json:"avatar"`
}

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

func Post_Avatar(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	usr, err := GetUserFromCtx(r)

	if err != nil {
		return http.StatusBadRequest, err
	}

	ctx := r.Context()

	req := &CreateAvatarReqBody{}

	err = json.NewDecoder(r.Body).Decode(req)

	if err != nil {
		return http.StatusBadRequest, err
	}

	err = req.validate()

	if err != nil {
		return http.StatusBadRequest, err
	}

	av, err := avatar.GetUsersAvatar(ctx, usr.UUID)

	if av != nil {
		//user has avatar already - cant create a new avatar
		return http.StatusBadRequest, fmt.Errorf("User already has an existing avatar.")
	}

	if err != nil {
		return http.StatusBadRequest, err
	}

	nameExists, err := avatar.DoesAvatarNameExist(ctx, req.Name)

	if err != nil {
		return http.StatusBadRequest, err
	}

	if nameExists {
		//an avatar already exists with that name
		return http.StatusBadRequest, fmt.Errorf("Avatar name already exists.")
	}

	av, err = avatar.Create(ctx, usr.UUID, req.Name, req.HairColor, req.TopColor, req.BottomColor)

	if err != nil {
		return http.StatusBadRequest, err
	}

	return output.SuccessResponse(w, r, &GetAvatarSuccessResponse{Avatar: *av.ToClient()})
}

func Get_Avatar(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()

	usr, err := GetUserFromCtx(r)

	if err != nil {
		return http.StatusBadRequest, err
	}

	av, err := avatar.GetUsersAvatar(r.Context(), usr.UUID)

	if err != nil {
		return http.StatusBadRequest, err
	}

	return output.SuccessResponse(w, r, &GetAvatarSuccessResponse{Avatar: *av.ToClient()})

}
