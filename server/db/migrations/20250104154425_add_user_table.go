package migrations

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upAddUserTable, downAddUserTable)
}

func upAddUserTable(ctx context.Context, tx *sql.Tx) error {
	fmt.Println("runs")
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

	return nil
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
