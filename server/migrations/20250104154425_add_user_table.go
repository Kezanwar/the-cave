package migrations

import (
	user "TheCave/models"
	"context"
	"database/sql"
	"time"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upAddUserTable, downAddUserTable)
}

func upAddUserTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is applied.
	query := `CREATE TABLE users (
		id SERIAL PRIMARY KEY,
		first_name VARCHAR(50),
		last_name VARCHAR(50),
		email VARCHAR(120),
		password VARCHAR(120),
		created_at TIMESTAMP DEFAULT now(),
		updated_at TIMESTAMP DEFAULT now()
	)`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}

	err = insertDummyUser(ctx, tx)

	if err != nil {
		return err
	}

	return nil
}

func insertDummyUser(ctx context.Context, tx *sql.Tx) error {
	kez := user.User{
		FirstName: "Kez",
		LastName:  "Anwar",
		Email:     "kezanwar@gmail.com",
		Password:  "hashed_password", // Replace with an actual hashed password
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	query := `
		INSERT INTO users 
		(first_name, last_name, email, password, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	_, err := tx.ExecContext(ctx, query,
		kez.FirstName, kez.LastName, kez.Email, kez.Password, kez.CreatedAt, kez.UpdatedAt,
	)

	return err
}
func downAddUserTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is rolled back.
	query := `DROP TABLE users`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}

	return nil
}
