package avatar

import "github.com/jackc/pgx/v4"

func ScanIntoAvatar(row pgx.Row, model *Model) error {
	err := row.Scan(
		&model.ID,
		&model.UUID,
		&model.UserUUID,
		&model.Name,
		&model.HairColor,
		&model.TopColor,
		&model.BottomColor,
		&model.CreatedAt,
		&model.UpdatedAt,
	)

	return err
}
