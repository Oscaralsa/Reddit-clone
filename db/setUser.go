package db

import (
	"context"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func SetUser(u models.User, ID string) (bool, error) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("users")

	//Create user to modify
	user := make(map[string]interface{})

	//Set user to modify by the user given
	user["birth_date"] = u.BirthDate
	if len(u.First_Name) > 0 {
		user["first_name"] = u.First_Name
	}
	if len(u.Last_Name) > 0 {
		user["last_name"] = u.Last_Name
	}
	if len(u.Avatar) > 0 {
		user["avatar"] = u.Avatar
	}
	if len(u.Banner) > 0 {
		user["banner"] = u.Banner
	}
	if len(u.Ubication) > 0 {
		user["ubication"] = u.Ubication
	}
	if len(u.Biography) > 0 {
		user["biography"] = u.Biography
	}
	if len(u.Web_Url) > 0 {
		user["web_url"] = u.Web_Url
	}

	//Set of user
	updateString := bson.M{
		"$set": user,
	}

	//Select user ID to modify
	objID, _ := primitive.ObjectIDFromHex(ID)
	filter := bson.M{"_id": bson.M{"$eq": objID}}

	_, err := col.UpdateOne(ctx, filter, updateString)
	if err != nil {
		return false, err
	}

	return true, nil
}
