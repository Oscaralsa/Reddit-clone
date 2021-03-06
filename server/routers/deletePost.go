package routers

import (
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func DeletePostProfile(w http.ResponseWriter, r *http.Request) {
	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID_MISSING", http.StatusBadRequest)
		return
	}

	err := db.DeletePost(ID, IDUser)
	if err != nil {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
}
