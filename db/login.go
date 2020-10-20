package db

import (
	"github.com/Oscaralsa/Reddit-clone/models"
	"golang.org/x/crypto/bcrypt"
)

func Login(email string, user_name string, password string) (models.User, bool) {
	user, login, _, _ := CheckUserExist("", user_name)
	if login == false {
		return user, false
	}

	passwordBytes := []byte(password)
	passwordBD := []byte(user.Password)
	err := bcrypt.CompareHashAndPassword(passwordBD, passwordBytes)
	if err != nil {
		return user, false
	}
	return user, true
}
