package db

import (
	"context"
	"time"

	"github.com/Oscaralsa/Reddit-clone/models"
)

func InsertFollow(t models.Follow) (bool, error) {

	//Set a timeout of 15 seconds
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
	defer cancel()

	//Insert into Reddit-Clone database to the collection users
	db := MongoCN.Database("Reddit-Clone")
	col := db.Collection("follow")

	_, err := col.InsertOne(ctx, t)
	if err != nil {
		return false, err
	}

	return true, nil
}
