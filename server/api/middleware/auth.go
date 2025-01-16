package middleware

import (
	api_constants "TheCave/api/constants"
	"TheCave/api/output"
	"TheCave/models/user"
	"TheCave/services/jwt"
	"TheCave/services/uuid"
	"context"
	"net/http"
)

func Auth(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		token := r.Header.Get(api_constants.AUTH_TOKEN_HEADER)

		if len(token) == 0 {
			r.Body.Close()
			output.WriteJson(w, r, http.StatusForbidden, output.MessageResponse{Message: "Auth token required"})
			return
		}

		parsed, err := jwt.Parse(token)

		if err != nil {
			r.Body.Close()
			output.WriteJson(w, r, http.StatusForbidden, output.MessageResponse{Message: err.Error()})
			return
		}

		id, ok := parsed["uuid"].(string)

		if !ok || !uuid.Validate(id) {
			r.Body.Close()
			output.WriteJson(w, r, http.StatusForbidden, output.MessageResponse{Message: "Auth token failed"})
			return
		}

		usr, err := user.GetByUUID(r.Context(), id)

		if usr == nil {
			r.Body.Close()
			output.WriteJson(w, r, http.StatusForbidden, output.MessageResponse{Message: "Auth failed"})
			return
		}

		if err != nil {
			r.Body.Close()
			output.WriteJson(w, r, http.StatusForbidden, output.MessageResponse{Message: "Auth error"})
			return
		}

		ctx := context.WithValue(r.Context(), api_constants.USER_CTX, usr)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
