package db

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/stdlib"

	"github.com/pressly/goose/v3"
)

var Conn *pgx.Conn

var DATABASE_URL = os.Getenv("DATABASE_URL")

var db_user = os.Getenv("DB_USER")
var db_name = os.Getenv("DB_NAME")
var db_password = os.Getenv("DB_PASSWORD")

var migrationsDir = "./migrations"

func Connect() {
	var err error
	Conn, err = pgx.Connect(context.Background(), DATABASE_URL)
	if err != nil {
		log.Fatalf("Unable to connect to database: %v`\n", err)
	}
	fmt.Println("Postgres connected 🚀")
}

func Close() {
	if Conn != nil {
		err := Conn.Close(context.Background())
		if err != nil {
			log.Fatalf("Unable to close connection: %v\n", err)
		}
		fmt.Println("Postgres connection closed... 😡")
	}
}

func MigrateUp() {

	connConfig, err := pgx.ParseConfig(DATABASE_URL)
	// Use stdlib.OpenDB to create a database/sql compatible connection
	sqlDB := stdlib.OpenDB(*connConfig)

	defer sqlDB.Close()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if err := goose.Up(sqlDB, migrationsDir); err != nil {
		log.Fatalf("Failed to run migration up: %v", err)
	}

}

func MigrateDown() {
	connConfig, err := pgx.ParseConfig(DATABASE_URL)
	// Use stdlib.OpenDB to create a database/sql compatible connection
	sqlDB := stdlib.OpenDB(*connConfig)

	defer sqlDB.Close()

	if err != nil {
		fmt.Println(err)
		os.Exit(1)
	}

	if err := goose.Down(sqlDB, migrationsDir); err != nil {
		log.Fatalf("Failed to run migration down: %v", err)
	}
}
