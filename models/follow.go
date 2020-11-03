package models

type Follow struct {
	UserId   string `bson:"userId" json:"userId"`
	FollowId string `bson:"followId" json:"followId"`
}
