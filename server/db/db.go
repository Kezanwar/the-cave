package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v4"
)

var conn *pgx.Conn

var DATABASE_URL = os.Getenv("DATABASE_URL")

func Connect() {
	var err error
	conn, err = pgx.Connect(context.Background(), DATABASE_URL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v`\n", err)
	}
	fmt.Println("Postgres connected 🚀")
}

func Close() {
	if conn != nil {
		err := conn.Close(context.Background())
		if err != nil {
			log.Fatalf("Unable to close connection: %v\n", err)
		}
		fmt.Println("Postgres connection closed... 😡")
	}
}
