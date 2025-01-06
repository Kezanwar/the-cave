package migrations

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upInstallExtensions, downInstallExtensions)
}

func upInstallExtensions(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is applied.
	query := `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}

	return nil

}

func downInstallExtensions(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is rolled back.
	query := `DROP EXTENSION IF EXISTS "uuid-ossp";`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}
	return nil
}
