package tests

import (
	"database/sql"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strconv"

	postgres "github.com/incrementing-integers-service/server/models"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

var db *postgres.DB

var sqlPath = filepath.Join("../", "sql/", "create_table.sql")

func newDsnString(host, user, password, dbName, sslMode string, port int) string {
	return fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s", host, port, user, password, dbName, sslMode)
}

func emptyTable(tableName string) {
	_, err := db.Exec(fmt.Sprintf("DELETE FROM %s", tableName))
	if err != nil {
		log.Fatal(err)
	}
}
func populateSchema(db *sql.DB) {

	c, ioErr := ioutil.ReadFile(sqlPath)
	if ioErr != nil {
		log.Fatalf("fs: sql file %s was not found", sqlPath)
	}
	sql := string(c)
	_, err := db.Exec(sql)
	if err != nil {
		log.Fatalf("postgres"+": failed to create tables: %s", err)
	}
}

func setupTables() *postgres.DB {
	err := godotenv.Load("../.env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	username := os.Getenv("localPostgresUser")
	password := os.Getenv("localPostgresPassword")
	port, err := strconv.Atoi(os.Getenv("localPostgresPort"))
	host := os.Getenv("localPostgresHost")
	dbName := os.Getenv("localPostgresDbname")
	sslMode := os.Getenv("localPostgresOptionSsl")
	fmt.Println(newDsnString(host, username, password, dbName, sslMode, port))
	dbPersist, err := sql.Open("postgres", newDsnString(host, username, password, dbName, sslMode, port))
	if err != nil {
		log.Fatalf("postgres"+": failed to open a connection, err: %s", err)
	}
	clearSchema(dbPersist)
	populateSchema(dbPersist)
	return &postgres.DB{DB: dbPersist}
}

func clearSchema(db *sql.DB) {
	// the schema 'public' exists for each database by default and is used when you don't specify schema in dsn string
	dropDefaultSchema := `DROP SCHEMA public CASCADE; CREATE SCHEMA public;`
	_, err := db.Exec(dropDefaultSchema)
	if err != nil {
		log.Fatalf("postgres"+": failed to drop tables: %s", err)
	}
}
