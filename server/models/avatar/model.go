package avatar

import "time"

/*
`   CREATE TABLE avatars (
	id SERIAL PRIMARY KEY,
	uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
	user_uuid UUID references users(uuid),
	name VARCHAR(50),
	hair_color VARCHAR(7),
	top_color VARCHAR(7),
	bottom_color VARCHAR(7),
	created_at TIMESTAMP DEFAULT now(),
	updated_at TIMESTAMP DEFAULT now()
	)`
*/

type Model struct {
	ID          int       `json:"id"`
	UUID        string    `json:"uuid"`
	UserUUID    string    `json:"user_uuid"`
	Name        string    `json:"name"`
	HairColor   string    `json:"hair_color"`
	TopColor    string    `json:"top_color"`
	BottomColor string    `json:"bottom_color"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type ToClient struct {
	Name        string    `json:"name"`
	HairColor   string    `json:"hair_color"`
	TopColor    string    `json:"top_color"`
	BottomColor string    `json:"bottom_color"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func (m *Model) ToClient() *ToClient {
	return &ToClient{
		Name:        m.Name,
		HairColor:   m.HairColor,
		TopColor:    m.TopColor,
		BottomColor: m.BottomColor,
		CreatedAt:   m.CreatedAt,
		UpdatedAt:   m.UpdatedAt,
	}
}
