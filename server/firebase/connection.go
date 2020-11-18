package firebase

import (
	"context"
	firebase "firebase.google.com/go/v4"
	storage "firebase.google.com/go/v4/storage"
	"fmt"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
	"log"
)

//Load .env vars
var err = godotenv.Load()

var config = &firebase.Config{
	StorageBucket: "mastery-69380.appspot.com",
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
