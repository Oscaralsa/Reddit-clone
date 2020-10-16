package routers

import (
	"encoding/json"
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func GetOneFollow(w http.ResponseWriter, r *http.Request) {

	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID_MISSING", http.StatusBadRequest)
		return
	}

	var t models.Follow
	t.UserId = IDUser
	t.UserFollowId = ID

	var response models.FollowReturn

	status, err := db.SearchFollow(t)
	if err != nil || status == false {
		response.Status = false
	} else {
		response.Status = true
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}
