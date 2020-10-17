package db

import (
	"context"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func InsertPost(t models.Post) (string, bool, error) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("post")

	record := bson.M{
		"userId": t.UserId,
		"body":   t.Body,
		"date":   t.Date,
	}

	result, err := col.InsertOne(ctx, record)
	if err != nil {
		return "", false, err
	}

	objID, _ := result.InsertedID.(primitive.ObjectID)
	return objID.String(), true, nil
}
