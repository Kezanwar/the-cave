package db

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "TheCave/db/migrations"

	"github.com/jackc/pgx/v4"
	_ "github.com/lib/pq"
	"github.com/pressly/goose/v3"
)

var conn *pgx.Conn

var DATABASE_URL = os.Getenv("DATABASE_URL")

var db_user = os.Getenv("DB_USER")
var db_name = os.Getenv("DB_NAME")
var db_password = os.Getenv("DB_PASSWORD")

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

func MigrateUp() {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", db_user, db_password, db_name)

	db, err := sql.Open("postgres", connStr)
	defer db.Close()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	migrationsDir := "./db/migrations"

	if err := goose.Up(db, migrationsDir); err != nil {
		log.Fatalf("Failed to run migration up: %v", err)
	}

}

func MigrateDown() {
	connStr := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", db_user, db_password, db_name)
	fmt.Println(connStr)
	db, err := sql.Open("postgres", connStr)
	defer db.Close()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	migrationsDir := "./db/migrations"

	if err := goose.Down(db, migrationsDir); err != nil {
		log.Fatalf("Failed to run migration down: %v", err)
	}

}
