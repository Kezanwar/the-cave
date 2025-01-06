package main

import (
	"TheCave/api"
	"TheCave/db"
	_ "TheCave/migrations"
	"TheCave/models/user"
	socketio "TheCave/socket"
	"fmt"

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

	users, err := user.FetchAll()

	if err != nil {
		panic(err)
	}

	fmt.Println(users)

	_api := &api.APIServer{}
	_socket := &socketio.Socket{}

	server.Handle("/api/", http.StripPrefix("/api", _api.Router()))
	server.Handle("/socket.io/", _socket.Router())

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
	_socket.Close()
	db.Close()
	os.Exit(0)

}
