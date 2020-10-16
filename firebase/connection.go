package firebase

import (
	"context"
	"fmt"
	"log"
	"os"

	firebase "firebase.google.com/go/v4"
	storage "firebase.google.com/go/v4/storage"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

//Load .env vars
var err = godotenv.Load()

var config = &firebase.Config{
	StorageBucket: os.Getenv("BUCKET_NAME") + ".appspot.com",
}
var opt = option.WithCredentialsFile("serviceAccountKey.json")

func ConnectStorage() *storage.Client {

	app, err := firebase.NewApp(context.Background(), config, opt)

	if err != nil {
		fmt.Println(err)
	}

	client, err := app.Storage(context.Background())
	if err != nil {
		fmt.Println(err)
	}

	log.Printf("Firebase connection succesful")
	return client
}
