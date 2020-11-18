package db

import (
	"context"
	"fmt"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func SearchPost(ID string, page int64) ([]*models.PostReturn, bool) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("post")

	var results []*models.PostReturn

	condition := bson.M{
		"userId": ID,
	}

	//Make the cursor
	option := options.Find()
	option.SetLimit(20)
	option.SetSort(bson.D{{Key: "date", Value: -1}})
	option.SetSkip((page - 1) * 20)

	//Find all by ID and cursor
	cursor, err := col.Find(ctx, condition, option)

	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}
	for cursor.Next(context.TODO()) {

		var record models.PostReturn
		err := cursor.Decode(&record)

		if err != nil {
			fmt.Println(err.Error())
			return results, false
		}
		results = append(results, &record)
	}
	return results, true
}

func SearchAllPost(page int64) ([]*models.PostReturn, bool) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("post")

	var results []*models.PostReturn

	//Make the cursor
	option := options.Find()
	option.SetLimit(20)
	option.SetSort(bson.D{{Key: "likes", Value: -1}})
	option.SetSkip((page - 1) * 20)

	//Find all by ID and cursor
	cursor, err := col.Find(ctx, bson.D{}, option)
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}
	for cursor.Next(context.TODO()) {

		var record models.PostReturn
		err := cursor.Decode(&record)

		if err != nil {
			fmt.Println(err.Error())
			return results, false
		}
		results = append(results, &record)
	}
	return results, true
}
