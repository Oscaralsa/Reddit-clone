package routers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func GetPostProfile(w http.ResponseWriter, r *http.Request) {

	ID := r.URL.Query().Get("id")
	if len(ID) < 1 {
		http.Error(w, "ID_MISSING", http.StatusBadRequest)
		return
	}

	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "PAGE_MISSING", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "PAGE_ERROR "+err.Error(), http.StatusBadRequest)
		return
	}

	pag := int64(page)
	response, correct := db.SearchPost(ID, pag)
	if correct == false {
		http.Error(w, "SERVER_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func GetAllPost(w http.ResponseWriter, r *http.Request) {

	if len(r.URL.Query().Get("page")) < 1 {
		http.Error(w, "PAGE_MISSING", http.StatusBadRequest)
		return
	}

	page, err := strconv.Atoi(r.URL.Query().Get("page"))
	if err != nil {
		http.Error(w, "PAGE_ERROR "+err.Error(), http.StatusBadRequest)
		return
	}

	pag := int64(page)
	response, correct := db.SearchAllPost(pag)
	if correct == false {
		http.Error(w, "SERVER_ERROR", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}
