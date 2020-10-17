package routers

import (
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func PostFollow(w http.ResponseWriter, r *http.Request) {

	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID_MISSING", http.StatusBadRequest)
	}

	var t models.Follow
	t.UserId = IDUser
	t.UserFollowId = ID

	status, err := db.InsertFollow(t)
	if err != nil || status == false {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
