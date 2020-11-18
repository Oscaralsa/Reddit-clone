package routers

import (
	"context"
	"io"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/firebase"
	"github.com/Oscaralsa/Reddit-clone/models"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
)

var err = godotenv.Load()

func PostPost(w http.ResponseWriter, r *http.Request) {

	var multimediaPost string

	uuid1, _ := uuid.NewRandom()
	//Get file
	file, handler, err := r.FormFile("multimedia")
	if err == nil {

		//Upload file google cloud
		ext := strings.Split(handler.Filename, ".")[1]
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*50)
		defer cancel()

		//Set the storage configuration
		bucket, err := firebase.ConnectStorage().DefaultBucket()
		if err != nil {
			http.Error(w, "FIREBASE_ERROR"+err.Error(), 400)
		}

		//Write the multimedia in storage
		wc := bucket.Object("user/" + IDUser + "/post/" + uuid1.String() + "." + ext).NewWriter(ctx)

		if _, err = io.Copy(wc, file); err != nil {
			http.Error(w, "COPY_ERROR"+err.Error(), 400)
		}

		if err := wc.Close(); err != nil {
			http.Error(w, "SERVER_ERROR"+err.Error(), http.StatusInternalServerError)
		}

		multimediaPost = "http://storage.googleapis.com/" + os.Getenv("BUCKET_NAME") + ".appspot.com/user/" + IDUser + "/post/" + uuid1.String() + "." + ext
	} else {
		multimediaPost = ""
	}

	body := r.PostFormValue("body")
	title := r.PostFormValue("title")
	l := r.PostFormValue("likes")

	likes, err := strconv.Atoi(l)

	record := models.Post{
		UserId:     IDUser,
		Title:      title,
		Body:       body,
		Date:       time.Now(),
		Likes:      likes,
		Multimedia: multimediaPost,
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
