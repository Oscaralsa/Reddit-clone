package main

import (
	"log"
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
	"github.com/Oscaralsa/Reddit-clone/handlers"
)

func main() {

	http.Handle("/", http.FileServer(http.Dir("./web")))

	if db.CheckConnection() == false {
		log.Fatal("No connection to database")
		return
	}

	handlers.Handlers()
}
