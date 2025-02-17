package debug

import (
	"log"

	"github.com/gorilla/mux"
)

func LogRoutes(r *mux.Router) {
	err := r.Walk(func(route *mux.Route, router *mux.Router, ancestors []*mux.Route) error {
		path, err := route.GetPathTemplate()
		if err == nil {
			log.Println("✅ Registered Route:", path)
		}
		return nil
	})
	if err != nil {
		log.Println("❌ Error walking routes:", err)
	}
}
