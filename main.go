package main

import (
	"log"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/handlers"
)

func main() {

	if db.CheckConnection() == false {
		log.Fatal("No connection to database")
		return
	}

	handlers.Handlers()
}
