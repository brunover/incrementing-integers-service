package user

import (
	postgres "github.com/incrementing-integers-service/server/models"
)

// User struct with the same fields as DB
type User struct {
	ID       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
	IntValue int    `json:"int_value"`
	Created  string `json:"created"`
	Updated  string `json:"updated"`
}

// SeedUser Add initial user (admin) to table
func SeedUser(db *postgres.DB) error {
	user := &User{Email: "admin@admin.com", Password: "12345", IntValue: 0}
	_, err := Create(db, user)
	return err
}

// Create add new user to table
func Create(db *postgres.DB, user *User) (int, error) {
	err := db.QueryRow(`INSERT INTO users (email, password, int_value) VALUES ($1,$2,$3) RETURNING id;`,
		user.Email, user.Password, user.IntValue).Scan(&user.ID)
	return user.ID, err
}

// GetList retrieves all users
func GetList(db *postgres.DB) ([]interface{}, error) {
	user := User{}
	var arr []interface{}

	sql := `SELECT id, email, password, int_value FROM users`
	rows, err := db.Query(sql)
	defer rows.Close()
	for rows.Next() {
		rows.Scan(
			&user.ID, &user.Email, &user.Password, &user.IntValue,
		)
		arr = append(arr, user)
	}
	return arr, err
}

// Get retrieves a User entry
func Get(db *postgres.DB, id int) (interface{}, error) {
	user := &User{}
	sql := `SELECT id, email, password, int_value FROM users WHERE id = $1`
	err := db.QueryRow(sql, id).Scan(&user.ID, &user.Email, &user.Password, &user.IntValue)
	return user, err
}

// UpdateInteger changes the current integer value
func UpdateInteger(db *postgres.DB, id int, intValue int) error {
	sql := `UPDATE users SET int_value=$1 WHERE id=$2`
	_, err := db.Exec(sql, intValue, id)
	return err
}
