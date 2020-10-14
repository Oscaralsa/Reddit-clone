package middlewares

import (
	"net/http"

	"github.com/Oscaralsa/Reddit-clone/routers"
)

func CheckJWT(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, _, _, err := routers.TokenProcess(r.Header.Get("Authorization"))
		if err != nil {
			http.Error(w, "TOKEN_ERROR"+err.Error(), http.StatusBadRequest)
			return
		}
		next.ServeHTTP(w, r)
	}
}
