package db

import (
	"context"
	"fmt"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func SearchAllUsers(ID string, page int64, search string, typeUser string) ([]*models.User, bool) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("users")

	var results []*models.User

	findOptions := options.Find()
	findOptions.SetSkip((page - 1) * 20)
	findOptions.SetLimit(20)

	//?i : lowercase or uppercase
	query := bson.M{
		"first_name": bson.M{"$regex": `(?i)` + search},
	}
	//Search by cursor
	cur, err := col.Find(ctx, query, findOptions)
	if err != nil {
		fmt.Println(err.Error(), 1)
		return results, false
	}

	var found, include bool

	for cur.Next(ctx) {
		var s models.User
		err := cur.Decode(&s)
		if err != nil {
			fmt.Println(err.Error(), 2)
			return results, false
		}

		var r models.Follow
		r.UserId = ID
		r.UserFollowId = s.ID.Hex()

		include = false

		found, err = SearchFollow(r)
		//If my search is for new users I don't follow
		if typeUser == "new" && found == false {
			include = true
		}
		//If my search is for users I follow
		if typeUser == "follow" && found == true {
			include = true
		}

		if r.UserFollowId == ID {
			include = false
		}

		fmt.Println(ID, include, found)
		if include == true {
			s.Password = ""

			results = append(results, &s)
		}
	}

	err = cur.Err()
	if err != nil {
		fmt.Println(err.Error())
		return results, false
	}

	cur.Close(ctx)

	return results, true
}
