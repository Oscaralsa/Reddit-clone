package db

import (
	"context"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

func CheckUserExist(email string, user_name string) (models.User, bool, string, string) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("users")

	var IDUserName = ""
	var IDEmail = ""
	var err error
	var err1 error
	var result models.User

	var base = "000000000000000000000000"
	var found = true

	//Check if user exist by user name
	if len(user_name) > 0 {
		condition := bson.M{"user_name": user_name}
		err = col.FindOne(ctx, condition).Decode(&result)
		IDUserName = result.ID.Hex()
	}

	//Check if user exist by email
	if len(email) > 0 {
		condition1 := bson.M{"email": email}
		err1 = col.FindOne(ctx, condition1).Decode(&result)
		IDEmail = result.ID.Hex()
	}

	if err != nil && err1 != nil {
		found = false
	}

	if IDUserName != base {
		IDUserName = ""
	}
	if IDEmail != base {
		IDEmail = ""
	}
	return result, found, IDUserName, IDEmail

}
