package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func GetFollowPost(w http.ResponseWriter, r *http.Request) {

	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "PAGE_MISSING", http.StatusBadRequest)
	}
	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "PAGE_FORMAT_ERROR", http.StatusBadRequest)
		return
	}

	response, status := db.SearchFollowPost(IDUser, page)
	if status == false {
		http.Error(w, "SERVER_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
