package jwt

import (
	"fmt"
	"os"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	jwt "github.com/dgrijalva/jwt-go"
	"github.com/joho/godotenv"
)

func CreateJWT(t models.User) (string, error) {

	//Load .env vars
	var errEnv = godotenv.Load()
	if errEnv != nil {
		fmt.Println("Error loading .env file")
	}

	secretPassword := []byte(os.Getenv("SECRET_KEY"))

	payload := jwt.MapClaims{
		"email":      t.Email,
		"user_name":  t.User_Name,
		"birth_date": t.BirthDate,
		"biography":  t.Biography,
		"ubication":  t.Ubication,
		"avatar":     t.Avatar,
		"web_url":    t.Web_Url,
		"_id":        t.ID.Hex(),
		"exp":        time.Now().Add(time.Hour * 24).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, payload)
	tokenStr, err := token.SignedString(secretPassword)
	if err != nil {
		return tokenStr, err
	}
	return tokenStr, nil
}
