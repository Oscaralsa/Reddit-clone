package models

type Follow struct {
	UserId       string `bson:"userId" json:"userId"`
	UserFollowId string `bson:"userFollowId" json:"userFollowId"`
}
