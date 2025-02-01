package avatar

import (
	"TheCave/services/validate"
	"context"
	"fmt"
)

func Create(ctx context.Context, name, hairColor, topColor, bottomColor string) (*Model, error) {

	colors := []string{hairColor, topColor, bottomColor}

	for _, c := range colors {
		if !validate.IsHexColorCode(c) {
			return nil, fmt.Errorf("Colors must be Hex Color Codes")
		}
	}

	// now := time.Now()

	// query := `
	//     INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
	//     VALUES ($1, $2, $3, $4, $5, $6)
	//     RETURNING id, uuid, first_name, last_name, email, password, created_at, updated_at;
	// `

	// if err != nil {
	// 	return nil, fmt.Errorf("user.New hashPw %w", err)
	// }

	// row := db.Conn.QueryRow(ctx, query,
	// 	firstName, lastName, email, hash_pass, now, now,
	// )

	// usr := &Model{}

	// err = ScanIntoUser(row, usr)

	// if err != nil {
	// 	return nil, fmt.Errorf("user.New row.Scan %w", err)
	// }

	return nil, nil
}
