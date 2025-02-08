package avatar

import (
	"TheCave/db"
	"TheCave/services/validate"
	"context"
	"fmt"
	"time"
)

func Create(ctx context.Context, user_uuid, name, hairColor, topColor, bottomColor string) (*Model, error) {

	if !validate.IsHexColorCode(hairColor, topColor, bottomColor) {
		return nil, fmt.Errorf("Colors must be Hex Color Codes")
	}

	now := time.Now()

	query := `
	    INSERT INTO avatars (user_uuid, name, hair_color, top_color, bottom_color, created_at, updated_at)
	    VALUES ($1, $2, $3, $4, $5, $6, $7)
	    RETURNING id, uuid, user_uuid, name, hair_color, top_color, bottom_color, created_at, updated_at;
	`

	row := db.Conn.QueryRow(ctx, query,
		user_uuid, name, hairColor, topColor, bottomColor, now, now,
	)

	av := &Model{}

	err := ScanIntoAvatar(row, av)

	if err != nil {
		return nil, fmt.Errorf("avatar.Create row.Scan %w", err)
	}

	return nil, nil
}

func GetUsersAvatar(ctx context.Context, user_uuid string) (*Model, error) {
	query :=
		`SELECT id, uuid, user_uuid, name, hair_color, top_color, bottom_color, created_at, updated_at 
		FROM avatars
		WHERE user_uuid=$1
		`

	row := db.Conn.QueryRow(ctx, query, user_uuid)

	av := &Model{}

	err := ScanIntoAvatar(row, av)

	if err != nil {
		if db.IsNoRowsError(err) {
			//no row found, email doesnt exist
			return nil, nil
		}
		return nil, fmt.Errorf("user.DoesEmailExist: scan failed: %w", err)
	}

	return av, nil
}

func DoesAvatarNameExist(ctx context.Context, name string) (bool, error) {
	query :=
		`SELECT name
		FROM avatars
		WHERE name=$1
		`

	row := db.Conn.QueryRow(ctx, query, name)

	var found string

	err := row.Scan(&found)

	if err != nil {
		if db.IsNoRowsError(err) {
			//no row found, email doesnt exist
			return false, nil
		}
		return false, fmt.Errorf("user.DoesEmailExist: scan failed: %w", err)
	}

	return true, nil
}
