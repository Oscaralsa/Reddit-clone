package db

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

/*MongoCN store the Client mongo object in a var */
var MongoCN = ConnectDB()

var databasePass = os.Getenv("DATABASE_PASS")

var clientOptions = options.Client().ApplyURI("mongodb+srv://Oscar:" + databasePass + "@reddit-clone.yvj6y.azure.mongodb.net/Reddit-Clone?retryWrites=true&w=majority")

/*ConnectDB is the function to connect to MongoDB Atlas */
func ConnectDB() *mongo.Client {

	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err.Error())
		return client
	}

	err = client.Ping(context.TODO(), nil)
	if err != nil {
		log.Fatal(err.Error(), 3000)
		return client
	}
	log.Printf("Connection succesful")

	return client
}

/*CheckConnection checks the connection and return a boolean */
func CheckConnection() bool {
	err := MongoCN.Ping(context.TODO(), nil)
	if err != nil {
		return false
	}
	return true
}
