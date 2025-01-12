package jwt

import (
	"fmt"
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

var JWT_SECRET = os.Getenv("JWT_SECRET")

type KeysMap = struct {
	Exp  string
	UUID string
}

var Keys = &KeysMap{
	Exp:  "exp",
	UUID: "uuid",
}

func Create(key string, value string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		key:      value,
		Keys.Exp: time.Now().AddDate(0, 0, 14).Unix(),
	})

	tokenString, err := token.SignedString([]byte(JWT_SECRET))

	if err != nil {
		return "", err
	}

	return tokenString, nil

}

func Parse(token string) (jwt.MapClaims, error) {
	parsed, err := jwt.Parse(token, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", t.Header["alg"])
		}
		return []byte(JWT_SECRET), nil
	})

	if err != nil {
		return nil, fmt.Errorf("Token is expired")
	}

	claims, ok := parsed.Claims.(jwt.MapClaims)

	if !ok {
		return nil, fmt.Errorf("jwt.parseToken: Unable to extract claims from token")
	}

	return claims, nil

}

func IsExpired(claims jwt.MapClaims) bool {
	exp, ok := claims[Keys.Exp].(float64)
	if !ok {
		fmt.Println("token.isExpired: Expiry cant be found")
		return false
	}
	if time.Unix(int64(exp), 0).Before(time.Now()) {
		return false
	}
	return true
}
