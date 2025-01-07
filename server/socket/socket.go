package socket

import (
	"net/http"
	"time"

	"github.com/zishang520/engine.io/types"
	"github.com/zishang520/socket.io/socket"
)

var io *socket.Server

func GetServerOptions() *socket.ServerOptions {
	o := socket.DefaultServerOptions()
	o.SetServeClient(true)
	// o.SetConnectionStateRecovery(&socket.ConnectionStateRecovery{})
	// o.SetAllowEIO3(true)
	o.SetPingInterval(300 * time.Millisecond)
	o.SetPingTimeout(200 * time.Millisecond)
	o.SetMaxHttpBufferSize(1000000)
	o.SetConnectTimeout(1000 * time.Millisecond)
	o.SetCors(&types.Cors{
		Origin:      "*",
		Credentials: true,
	})

	return o
}

func Router() http.Handler {

	options := GetServerOptions()

	io = socket.NewServer(nil, options)

	io.Of("/lobby", nil).On("connect", func(clients ...any) {
		LobbySocket(clients...)
	})

	return io.ServeHandler(nil)
}

func Close() {
	io.Close(nil)
}
