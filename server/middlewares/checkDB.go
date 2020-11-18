package middlewares

import (
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/db"
)

func CheckDB(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if db.CheckConnection() == false {
			http.Error(w, "Database connection lost", 500)
			return
		}
		next.ServeHTTP(w, r)
	}
}
