package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID         primitive.ObjectID `bson:"_id, omitempty" json:"id"`
	First_Name string             `bson:"first_name" json:"first_name,omitempty"`
	Last_Name  string             `bson:"last_name" json:"last_name,omitempty"`
	BirthDate  time.Time          `bson:"birth_date" json:"birth_date,omitempty"`
	Email      string             `bson:"email" json:"email"`
	Password   string             `bson:"password" json:"password,omitempty"`
	Avatar     string             `bson:"avatar" json:"avatar,omitempty"`
	Banner     string             `bson:"banner" json:"banner,omitempty"`
	Ubication  string             `bson:"ubication" json:"ubication,omitempty"`
	Biography  string             `bson:"biography" json:"biography,omitempty"`
	Web_Url    string             `bson:"web_url" json:"web_url,omitempty"`
}
