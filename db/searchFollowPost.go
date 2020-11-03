package db

import (
	"context"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
)

func SearchFollowPost(ID string, page int) ([]models.PostFollow, bool) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("follow")

	skip := (page - 1) * 20

	conditions := make([]bson.M, 0)
	conditions = append(conditions, bson.M{"$match": bson.M{"userId": ID}})
	//Make relations
	conditions = append(conditions, bson.M{
		"$lookup": bson.M{
			"from":         "post",
			"localField":   "followId",
			"foreignField": "userId",
			"as":           "post",
		}})
	conditions = append(conditions, bson.M{"$unwind": "$post"})
	conditions = append(conditions, bson.M{"$sort": bson.M{"post.date": -1}})
	conditions = append(conditions, bson.M{"$skip": skip})
	conditions = append(conditions, bson.M{"$limit": 20})

	cursor, err := col.Aggregate(ctx, conditions)
	var result []models.PostFollow
	err = cursor.All(ctx, &result)
	if err != nil {
		return result, false
	}
	return result, true

}
