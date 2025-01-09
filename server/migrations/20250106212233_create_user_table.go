package migrations

import (
	"TheCave/models/user"
	"TheCave/services/bcrypt"
	"context"
	"database/sql"
	"time"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upCreateUserTable, downCreateUserTable)
}

func upCreateUserTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is applied.
	create_table := `CREATE TABLE users (
		id SERIAL PRIMARY KEY,
		uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
		first_name VARCHAR(50),
		last_name VARCHAR(50),
		email VARCHAR(120),
		password VARCHAR(120),
		created_at TIMESTAMP DEFAULT now(),
		updated_at TIMESTAMP DEFAULT now()
	)`
	_, err := tx.Exec(create_table)

	if err != nil {
		return err
	}

	create_index := `CREATE INDEX idx_users_uuid ON users(uuid)`

	_, err = tx.Exec(create_index)

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

	hashed_password, err := bcrypt.HashPassword("hashed_password")

	if err != nil {
		return err
	}

	kez := user.Model{
		FirstName: "Kez",
		LastName:  "Anwar",
		Email:     "kezanwar@gmail.com",
		Password:  hashed_password,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}

	insert_user := `
		INSERT INTO users 
		(first_name, last_name, email, password, created_at, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6)
	`

	_, err = tx.ExecContext(ctx, insert_user,
		kez.FirstName, kez.LastName, kez.Email, kez.Password, kez.CreatedAt, kez.UpdatedAt,
	)

	return err
}
func downCreateUserTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is rolled back.
	query := `DROP TABLE users`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}

	return nil
}
