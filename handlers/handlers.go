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

	router.HandleFunc("/profile", middlewares.CheckDB(routers.GetProfile)).Methods("GET")
	router.HandleFunc("/profile", middlewares.CheckDB(middlewares.CheckJWT(routers.UpdateProfile))).Methods("PUT")

	router.HandleFunc("/post", middlewares.CheckDB(middlewares.CheckJWT(routers.PostPost))).Methods("POST")
	router.HandleFunc("/post", middlewares.CheckDB(routers.GetAllPost)).Methods("GET")
	router.HandleFunc("/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.GetPostProfile))).Methods("GET")
	router.HandleFunc("/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.DeletePostProfile))).Methods("DELETE")
	router.HandleFunc("/post-follow", middlewares.CheckDB(middlewares.CheckJWT(routers.GetFollowPost))).Methods("GET")

	//Upload files
	router.HandleFunc("/avatar", middlewares.CheckDB(middlewares.CheckJWT(routers.UploadAvatar))).Methods("POST")

	//Follows
	router.HandleFunc("/follow", middlewares.CheckDB(middlewares.CheckJWT(routers.PostFollow))).Methods("POST")
	router.HandleFunc("/follow", middlewares.CheckDB(middlewares.CheckJWT(routers.DeleteFollow))).Methods("DELETE")
	router.HandleFunc("/follow-status", middlewares.CheckDB(middlewares.CheckJWT(routers.GetOneFollow))).Methods("GET")

	router.HandleFunc("/all-users", middlewares.CheckDB(middlewares.CheckJWT(routers.GetAllUsers))).Methods("GET")

	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
