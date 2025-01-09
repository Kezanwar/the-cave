package user

import "time"

//     `CREATE TABLE users (
// 		id SERIAL PRIMARY KEY,
// 		uuid UUID DEFAULT uuid_generate_v4() UNIQUE,
// 		first_name VARCHAR(50),
// 		last_name VARCHAR(50),
// 		email VARCHAR(120),
// 		password VARCHAR(120),
// 		created_at TIMESTAMP DEFAULT now(),
// 		updated_at TIMESTAMP DEFAULT now()
// 	    )`

type Model struct {
	ID        int       `json:"id"`
	UUID      string    `json:"uuid"`
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type ToClient struct {
	FirstName string    `json:"first_name"`
	LastName  string    `json:"last_name"`
	Email     string    `json:"email"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (m *Model) ToClient() *ToClient {
	return &ToClient{FirstName: m.FirstName, LastName: m.LastName, Email: m.Email, CreatedAt: m.CreatedAt, UpdatedAt: m.UpdatedAt}
}
