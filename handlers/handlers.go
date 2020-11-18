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

	router.HandleFunc("/api/sign-up", middlewares.CheckDB(routers.Signup)).Methods("POST")
	router.HandleFunc("/api/login", middlewares.CheckDB(routers.Login)).Methods("POST")

	router.HandleFunc("/api/profile", middlewares.CheckDB(routers.GetProfile)).Methods("GET")
	router.HandleFunc("/api/profile", middlewares.CheckDB(middlewares.CheckJWT(routers.UpdateProfile))).Methods("PUT")

	router.HandleFunc("/api/post", middlewares.CheckDB(middlewares.CheckJWT(routers.PostPost))).Methods("POST")
	router.HandleFunc("/api/post", middlewares.CheckDB(routers.GetAllPost)).Methods("GET")
	router.HandleFunc("/api/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.GetPostProfile))).Methods("GET")
	router.HandleFunc("/api/post-profile", middlewares.CheckDB(middlewares.CheckJWT(routers.DeletePostProfile))).Methods("DELETE")
	router.HandleFunc("/api/post-follow", middlewares.CheckDB(middlewares.CheckJWT(routers.GetFollowPost))).Methods("GET")

	//Upload files
	router.HandleFunc("/api/avatar", middlewares.CheckDB(middlewares.CheckJWT(routers.UploadAvatar))).Methods("POST")

	//Follows
	router.HandleFunc("/api/follow", middlewares.CheckDB(middlewares.CheckJWT(routers.PostFollow))).Methods("POST")
	router.HandleFunc("/api/follow", middlewares.CheckDB(middlewares.CheckJWT(routers.DeleteFollow))).Methods("DELETE")
	router.HandleFunc("/api/follow-status", middlewares.CheckDB(middlewares.CheckJWT(routers.GetOneFollow))).Methods("GET")

	router.HandleFunc("/api/all-users", middlewares.CheckDB(middlewares.CheckJWT(routers.GetAllUsers))).Methods("GET")

	router.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./web"))))
	PORT := os.Getenv("PORT")
	if PORT == "" {
		PORT = "8080"
	}

	handler := cors.AllowAll().Handler(router)
	log.Fatal(http.ListenAndServe(":"+PORT, handler))
}
