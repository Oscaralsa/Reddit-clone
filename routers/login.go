package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/jwt"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func Login(w http.ResponseWriter, r *http.Request) {

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "INCORRECT_USER_OR_PASSWORD "+err.Error(), 400)
		return
	}
	if len(t.User_Name) == 0 {
		http.Error(w, "USERNAME_REQUIRED", 400)
		return
	}
	doc, exists := db.Login("", t.User_Name, t.Password)
	if exists == false {
		http.Error(w, "INCORRECT_USER_OR_PASSWORD 1", 400)
		return
	}

	jwtKey, err := jwt.CreateJWT(doc)
	if err != nil {
		http.Error(w, "SERVER_ERROR"+err.Error(), http.StatusInternalServerError)
		return
	}

	resp := models.LoginResponse{
		Token: jwtKey,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(resp)

	expirationTime := time.Now().Add(24 * time.Hour)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   jwtKey,
		Expires: expirationTime,
	})
}
