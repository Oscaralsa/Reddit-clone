package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func GetAllUsers(w http.ResponseWriter, r *http.Request) {

	typeUser := r.URL.Query().Get("type")
	page := r.URL.Query().Get("page")
	search := r.URL.Query().Get("search")

	pageTemp, err := strconv.Atoi(page)
	if err != nil {
		http.Error(w, "PAGE_MISSING", http.StatusBadRequest)
		return
	}

	pag := int64(pageTemp)

	result, status := db.SearchAllUsers(IDUser, pag, search, typeUser)
	if status == false {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(result)
}
