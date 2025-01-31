package migrations

import (
	"context"
	"database/sql"

	"github.com/pressly/goose/v3"
)

func init() {
	goose.AddMigrationContext(upCreateAvatarTable, downCreateAvatarTable)
}

func upCreateAvatarTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is applied.
	create_table := `CREATE TABLE avatars (
		id SERIAL PRIMARY KEY,
		uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
		user_uuid UUID references users(uuid) UNIQUE,
		name VARCHAR(50) UNIQUE,
		hair_color VARCHAR(7),
		top_color VARCHAR(7),
		bottom_color VARCHAR(7),
		created_at TIMESTAMP DEFAULT now(),
		updated_at TIMESTAMP DEFAULT now()
	)`

	_, err := tx.Exec(create_table)

	if err != nil {
		return err
	}

	create_useruuid_index := `CREATE INDEX idx_avatar_user_uuid ON avatars(user_uuid)`

	_, err = tx.Exec(create_useruuid_index)

	if err != nil {
		return err
	}

	create_name_index := `CREATE INDEX idx_avatar_name ON avatars(name)`

	_, err = tx.Exec(create_name_index)

	if err != nil {
		return err
	}

	return nil

}

func downCreateAvatarTable(ctx context.Context, tx *sql.Tx) error {
	// This code is executed when the migration is rolled back.
	query := `DROP TABLE avatars`
	_, err := tx.Exec(query)

	if err != nil {
		return err
	}

	return nil
}
