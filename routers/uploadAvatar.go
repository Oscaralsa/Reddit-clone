package routers

import (
	"context"
	"io"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/firebase"
	"github.com/Oscaralsa/Reddit-clone/models"
	"github.com/joho/godotenv"
)

//Load .env vars
var err1 = godotenv.Load()

func UploadAvatar(w http.ResponseWriter, r *http.Request) {

	//Get file
	file, handler, _ := r.FormFile("avatar")
	var ext = strings.Split(handler.Filename, ".")[1]

	ctx, cancel := context.WithTimeout(context.Background(), time.Second*50)
	defer cancel()

	//Set the storage configuration
	bucket, err := firebase.ConnectStorage().DefaultBucket()
	if err != nil {
		http.Error(w, "FIREBASE_ERROR"+err.Error(), 400)
	}

	//Write the avatar in storage
	wc := bucket.Object("user/" + IDUser + "/" + "avatar." + ext).NewWriter(ctx)

	if _, err = io.Copy(wc, file); err != nil {
		http.Error(w, "COPY_ERROR"+err.Error(), 400)
	}

	if err := wc.Close(); err != nil {
		http.Error(w, "SERVER_ERROR"+err.Error(), http.StatusInternalServerError)
	}

	var user models.User
	var status bool

	//Set user data with avatar
	user.Avatar = "http://storage.googleapis.com/" + os.Getenv("BUCKET_NAME") + ".appspot.com/user/" + IDUser + "/avatar." + ext
	status, err = db.SetUser(user, IDUser)
	if err != nil || status == false {
		http.Error(w, "DATABASE_ERROR "+err.Error(), 400)
		return
	}

	w.Header().Set("Content-type", "application/json")
	w.WriteHeader(http.StatusOK)
}
