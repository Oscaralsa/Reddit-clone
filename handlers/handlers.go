package handlers

import (
	"log"
	"net/http"
	"os"

	"github.com/Oscaralsa/Reddit-clone/middlewares"
	"github.com/Oscaralsa/Reddit-clone/routers"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

/*Handlers  handles routes*/
func Handlers() {
	router := mux.NewRouter()

	router.HandleFunc("/sign-up", middlewares.CheckDB(routers.Signup)).Methods("POST")

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
