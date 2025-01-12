package handlers

import (
	api_constants "TheCave/api/constants"
	"TheCave/models/user"
	"fmt"
	"net/http"
)

func GetUserFromCtx(r *http.Request) (*user.Model, error) {
	user_uuid, ok := r.Context().Value(api_constants.USER_UUID_CTX).(string)

	if !ok {
		return nil, fmt.Errorf("handlers.GetUserFromContext: cant find uuid in r.Context")
	}

	return nil, nil

}
