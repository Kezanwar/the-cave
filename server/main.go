package main

import (
	"TheCave/api"
	"TheCave/socket"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"

	"github.com/gorilla/mux"
)

var PORT = string(":") + os.Getenv("PORT")

func main() {
	server := mux.NewRouter()

	_api := &api.APIServer{}
	_socket := &socket.Socket{}

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
	os.Exit(0)

}
