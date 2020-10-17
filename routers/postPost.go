package routers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/models"
)

func PostPost(w http.ResponseWriter, r *http.Request) {
	var post models.Post
	err := json.NewDecoder(r.Body).Decode(&post)

	record := models.Post{
		UserId: IDUser,
		Body:   post.Body,
		Date:   time.Now(),
	}

	_, status, err := db.InsertPost(record)

	if err != nil {
		http.Error(w, "SERVER_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	if status == false {
		http.Error(w, "POST_ERROR "+err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
