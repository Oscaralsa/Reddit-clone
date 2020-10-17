package routers

import (
	"encoding/json"
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func GetProfile(w http.ResponseWriter, r *http.Request) {

	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID_NOT_FOUND", http.StatusBadRequest)
		return
	}

	profile, err := db.SearchProfile(ID)
	if err != nil {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
	} else {
		w.Header().Set("context-type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(profile)
	}
}
