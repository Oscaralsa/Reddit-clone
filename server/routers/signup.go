package routers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func Signup(w http.ResponseWriter, r *http.Request) {

	//Get the data
	var t models.User
	err := json.NewDecoder(r.Body).Decode(&t)

	if err != nil {
		http.Error(w, "DATA_ERROR_RECIEVED "+err.Error(), 400)
		return
	}

	//Check email
	if len(t.Email) == 0 {
		http.Error(w, "EMAIL_REQUIRED", 400)
		return
	}

	//Check password length
	if len(t.Password) < 6 {
		http.Error(w, "PASSWORD_NOT_6_CHARACTERS", 400)
		return
	}

	//Check if user exists
	_, exist, IDUserName, IDEmail := db.CheckUserExist(t.Email, t.User_Name)

	fmt.Println(exist, IDUserName, IDEmail)
	if exist == true && IDUserName == "" {
		http.Error(w, "USER_EXISTS", 400)
		return
	}
	if exist == true && IDEmail == "" {
		http.Error(w, "EMAIL_EXISTS", 400)
		return
	}

	_, status, err := db.InsertUser(t)

	if err != nil {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	if status == false {
		http.Error(w, "SERVER_ERROR1 "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
}
