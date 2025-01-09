package main

import (
	"TheCave/api"
	"TheCave/db"
	_ "TheCave/migrations"
	"TheCave/socket"

	_ "github.com/joho/godotenv/autoload"

	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gorilla/mux"
)

var PORT = string(":") + os.Getenv("PORT")

func main() {
	db.Connect()
	db.MigrateUp()

	server := mux.NewRouter()

	server.Handle("/socket.io/", socket.Router())

	apiRouter := server.PathPrefix("/api").Subrouter()
	api.RegisterRoutes(apiRouter)

	go http.ListenAndServe(":3000", server)

	log.Println("Game Server running on port 3000")

	exit := make(chan struct{})
	SignalC := make(chan os.Signal, 1)

	signal.Notify(SignalC, os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT)
	go func() {
		for s := range SignalC {
			switch s {
			case os.Interrupt, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM, syscall.SIGQUIT:
				close(exit)
				return
			}
		}
	}()

	<-exit
	socket.Close()
	db.Close()
	os.Exit(0)

}
