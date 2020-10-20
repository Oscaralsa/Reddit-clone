package routers

import (
	"errors"
	"fmt"
	"os"
	"strings"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

var Email string

var IDUser string

func TokenProcess(tk string) (*models.Claim, bool, string, error) {

	//Load .env vars
	var errEnv = godotenv.Load()
	if errEnv != nil {
		fmt.Println("Error loading .env file")
	}

	secretPassword := []byte(os.Getenv("SECRET_KEY"))
	claims := &models.Claim{}

	splitToken := strings.Split(tk, "Bearer ")
	if len(splitToken) != 2 {
		return claims, false, string(""), errors.New("format invalid")
	}

	tk = strings.TrimSpace(splitToken[1])

	tkn, err := jwt.ParseWithClaims(tk, claims, func(token *jwt.Token) (interface{}, error) {
		return secretPassword, nil
	})

	if err == nil {
		_, found, _, _ := db.CheckUserExist(claims.Email, "")
		if found == true {
			Email = claims.Email
			IDUser = claims.ID.Hex()
		}
		return claims, found, IDUser, nil
	}

	if !tkn.Valid {
		return claims, false, string(""), errors.New("token invalid")
	}
	return claims, false, string(""), err
}
