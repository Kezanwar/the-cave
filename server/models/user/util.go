package user

import "github.com/jackc/pgx/v4"

func ScanIntoUser(row pgx.Row, model *Model) error {
	err := row.Scan(
		&model.ID,
		&model.UUID,
		&model.FirstName,
		&model.LastName,
		&model.Email,
		&model.Password,
		&model.CreatedAt,
		&model.UpdatedAt,
	)

	return err
}
