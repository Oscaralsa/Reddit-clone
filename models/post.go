package models

import "time"

type Post struct {
	UserId string    `bson:"userId" json:"userId,omitempty"`
	Body   string    `bson:"body" json:"body,omitempty"`
	Date   time.Time `bson:"date" json:"date,omitempty"`
}
