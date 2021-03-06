package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PostReturn struct {
	ID         primitive.ObjectID `bson:"_id" json:"_id,omitempty"`
	UserId     string             `bson:"userId" json:"userId,omitempty"`
	Title      string             `bson:"title" json:"title,omitempty"`
	Body       string             `bson:"body" json:"body,omitempty"`
	Date       time.Time          `bson:"date" json:"date,omitempty"`
	Multimedia string             `bson:"multimedia" json:"multimedia,omitempty"`
	Likes      int                `bson:"likes" json:"likes,omitempty"`
}
