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
	router.HandleFunc("/login", middlewares.CheckDB(routers.Login)).Methods("POST")
	router.HandleFunc("/profile", middlewares.CheckDB(middlewares.CheckJWT(routers.GetProfile))).Methods("GET")
	router.HandleFunc("/profile", middlewares.CheckDB(middlewares.CheckJWT(routers.UpdateProfile))).Methods("PUT")
	router.HandleFunc("/post", middlewares.CheckDB(middlewares.CheckJWT(routers.PostPost))).Methods("POST")
	router.HandleFunc("/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.GetPostProfile))).Methods("GET")
	router.HandleFunc("/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.DeletePostProfile))).Methods("DELETE")

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
