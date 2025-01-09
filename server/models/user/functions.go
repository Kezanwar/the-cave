package user

import (
	"TheCave/db"
	"TheCave/services/bcrypt"
	"fmt"

	"context"
	"time"
)

func Create(ctx context.Context, firstName, lastName, email, password string) (*Model, error) {

	now := time.Now()

	query := `
        INSERT INTO users (first_name, last_name, email, password, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id, uuid, first_name, last_name, email, password, created_at, updated_at;
    `

	hash_pass, err := bcrypt.HashPassword(password)

	if err != nil {
		return nil, fmt.Errorf("user.New hashPw %w", err)
	}

	row := db.Conn.QueryRow(ctx, query,
		firstName, lastName, email, hash_pass, now, now,
	)

	usr := &Model{}

	err = ScanIntoUser(row, usr)

	if err != nil {
		return nil, fmt.Errorf("user.New row.Scan %w", err)
	}

	return usr, nil
}

func DoesEmailExist(ctx context.Context, email string) (bool, error) {
	query :=
		`SELECT email 
		FROM users
		WHERE email=$1
		`

	row := db.Conn.QueryRow(ctx, query, email)

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

func GetByEmail(ctx context.Context, email string) (*Model, error) {
	query :=
		`SELECT id, uuid, first_name, last_name, email, password, created_at, updated_at
		FROM users
		WHERE email=$1
		`

	row := db.Conn.QueryRow(ctx, query, email)

	user := &Model{}

	err := ScanIntoUser(row, user)

	if err != nil {
		if db.IsNoRowsError(err) {
			//no row found, user doesnt exist
			return nil, fmt.Errorf("user with email %s not found", email)
		}
		return nil, fmt.Errorf("user.DoesEmailExist: scan failed: %w", err)
	}

	return user, nil
}

func FetchAll(ctx context.Context) ([]*Model, error) {
	// Query to fetch all users
	query :=
		`SELECT id, uuid, first_name, last_name, email, password, created_at, updated_at 
		FROM users`

	rows, err := db.Conn.Query(ctx, query)

	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("user.FetchAll dbquery %w", err)
	}

	var all_users []*Model

	// Iterate over rows and populate the users slice
	for rows.Next() {
		user := &Model{}
		err := ScanIntoUser(rows, user)
		if err != nil {
			return nil, fmt.Errorf("user.FetchAll scanRow %w", err)
		}
		all_users = append(all_users, user)
	}

	// Check for any errors encountered during iteration
	if rows.Err() != nil {
		return nil, fmt.Errorf("user.FetchAll rows.Err %w", rows.Err())
	}

	return all_users, nil
}
