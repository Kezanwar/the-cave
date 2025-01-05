package user

import (
	"TheCave/db"
	"context"
	"fmt"
	"time"
)

type User struct {
	ID        int       `json:"id"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func FetchAll() ([]User, error) {
	// Query to fetch all users
	query :=
		`SELECT id, first_name, last_name, email, password, created_at, updated_at 
		FROM users`

	rows, err := db.Conn.Query(context.Background(), query)

	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("user.FetchAll: %w", err)
	}

	var all_users []User

	// Iterate over rows and populate the users slice
	for rows.Next() {
		var user User
		err := rows.Scan(
			&user.ID,
			&user.FirstName,
			&user.LastName,
			&user.Email,
			&user.Password,
			&user.CreatedAt,
			&user.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("user.fetchAll: failed to scan row: %w", err)
		}

		all_users = append(all_users, user)
	}

	// Check for any errors encountered during iteration
	if rows.Err() != nil {
		return nil, fmt.Errorf("user.fetchAll: rows iteration error: %w", rows.Err())
	}

	return all_users, nil
}
