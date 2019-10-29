package postgres

import (
	"database/sql"
	"errors"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
)

type DB struct {
	*sql.DB
}

const MaxConnections = 10

var (
	ErrorCannotFulfilRequest = errors.New("cannot fulfil your request right now, please try again later")
	ErrorMissingFields       = errors.New("missing required fields")
	ErrorBadFields           = errors.New("could not process some fields")
	ErrorAlreadyExists       = errors.New("duplicate resource found")
	ErrorNotFound            = errors.New("resource not found")
)

func OpenConnection() *DB {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dbHost := "postgres" // "localhost"
	dbPort := 5432
	dbUser := os.Getenv("POSTGRES_USER")
	dbPassword := os.Getenv("POSTGRES_PASSWORD")
	dbSchema := "increment_integer"
	db, err := sql.Open("postgres", fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", dbHost, dbPort, dbUser, dbPassword, dbSchema))
	if err != nil {
		log.Fatalf("Failed to connect to the database. Error: %s", err.Error())
	}
	return &DB{db}
}

// GetCount retrieves the total # of model entries
func GetCount(db *DB, sql string) (interface{}, error) {
	var count string
	err := db.QueryRow(sql).Scan(&count)
	return count, err
}

// Delete deletes a model entry
func Delete(db *DB, sql string, id int) error {
	_, err := db.Exec(sql, id)
	return err
}
