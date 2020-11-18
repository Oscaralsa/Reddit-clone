package main

import (
	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/handlers"
	"log"
)

func main() {

	if db.CheckConnection() == false {
		log.Fatal("No connection to database")
		return
	}

	handlers.Handlers()
}
