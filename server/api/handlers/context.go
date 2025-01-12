package handlers

import (
	api_constants "TheCave/api/constants"
	"TheCave/models/user"
	"fmt"
	"net/http"
)

func GetUserFromCtx(r *http.Request) (*user.Model, error) {
	usr, ok := r.Context().Value(api_constants.USER_CTX).(*user.Model)

	if !ok {
		return nil, fmt.Errorf("handlers.GetUserFromContext: cant find user in r.Context")
	}

	return usr, nil

}
