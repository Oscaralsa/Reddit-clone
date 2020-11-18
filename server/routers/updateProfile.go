package routers

import (
	"encoding/json"
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func UpdateProfile(w http.ResponseWriter, r *http.Request) {

	var t models.User

	err := json.NewDecoder(r.Body).Decode(&t)
	if err != nil {
		http.Error(w, "INCORRECT_DATA "+err.Error(), 400)
		return
	}

	var status bool

	status, err = db.SetUser(t, IDUser)
	if err != nil {
		http.Error(w, "SERVER_ERROR"+err.Error(), http.StatusInternalServerError)
		return
	}

	if status == false {
		http.Error(w, "SERVER_ERROR_1", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)

}
