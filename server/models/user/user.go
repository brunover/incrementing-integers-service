package user

import (
	"log"

	postgres "github.com/incrementing-integers-service/server/models"
)

// User struct with the same fields as DB
type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	IntValue int    `json:"int_value"`
	Created  string `json:"created"`
	Updated  string `json:"updated"`
}

// SeedUser Add initial user (admin) to table
func SeedUser(db *postgres.DB) error {
	user := &User{Email: "admin@admin.com", IntValue: 0}
	_, err := Create(db, user)
	return err
}

// Create add new user to table
func Create(db *postgres.DB, user *User) (int, error) {
	err := db.QueryRow(`INSERT INTO users (email, int_value) VALUES ($1,$2) RETURNING id;`,
		user.Email, user.IntValue).Scan(&user.ID)
	return user.ID, err
}

// GetList retrieves all users
func GetList(db *postgres.DB) ([]interface{}, error) {
	user := User{}
	var arr []interface{}

	sql := `SELECT id, email, int_value, created, last_updated FROM users`
	rows, err := db.Query(sql)
	defer rows.Close()
	for rows.Next() {
		rows.Scan(
			&user.ID, &user.Email, &user.IntValue, &user.Created, &user.Updated,
		)
		arr = append(arr, user)
	}
	return arr, err
}

// Get retrieves an User entry
func Get(db *postgres.DB, email string) (interface{}, error) {
	user := &User{}
	query := `SELECT id, email, int_value FROM users WHERE email = $1`
	err := db.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.IntValue)
	// If use ID is zero, no user was found in the database
	if user.ID == 0 {
		log.Printf("User %v was not found, creating it in the database", email)
		userToCreate := &User{Email: email, IntValue: 0}
		_, err := Create(db, userToCreate)
		return userToCreate, err
	}
	return user, err
}

// NextInteger updates users integer in DB and add +1
func NextInteger(db *postgres.DB, id int) (int, error) {
	log.Printf("ID %d requested new integer", id)
	user := User{}
	sql := `SELECT int_value FROM users WHERE id = $1`
	err := db.QueryRow(sql, id).Scan(&user.IntValue)
	nextInteger := user.IntValue + 1
	intValue, err := UpdateInteger(db, id, nextInteger)
	if err != nil {
		log.Printf("Updated value to: %d", intValue)
		return intValue, err
	}
	return nextInteger, err
}

// UpdateInteger changes the current integer value
func UpdateInteger(db *postgres.DB, id int, current int) (int, error) {
	log.Printf("ID %d will updateinteger to: %d", id, current)
	sql := `UPDATE users SET int_value=$1 WHERE id=$2`
	_, err := db.Exec(sql, current, id)
	return current, err
}

// CurrentInteger returns the current integedr of an user
func CurrentInteger(db *postgres.DB, id int) (int, error) {
	user := User{}
	sql := `SELECT int_value FROM users WHERE id = $1`
	err := db.QueryRow(sql, id).Scan(&user.IntValue)
	return user.IntValue, err
}
