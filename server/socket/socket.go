package socketio

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/zishang520/engine.io/types"
	"github.com/zishang520/socket.io/socket"
)

var opt = &socket.ServerOptions{}

type Socket struct {
	io *socket.Server
}

func (s *Socket) GetServerOptions() *socket.ServerOptions {
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

func (s *Socket) GetJsonFromSocketMsg(msg any) ([]byte, error) {
	raw, ok := msg.(map[string]interface{})
	if !ok {
		fmt.Println("msg is not a map[string]interface{}")
		return nil, fmt.Errorf("msg is not a map")
	}

	jsonData, err := json.Marshal(raw)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return nil, fmt.Errorf("unable to marshal msg to json")
	}

	return jsonData, nil
}

func (s *Socket) AssertMsgIsMap(msg any) bool {
	_, ok := msg.(map[string]interface{})
	return ok
}

func (s *Socket) Router() http.Handler {

	options := s.GetServerOptions()

	s.io = socket.NewServer(nil, options)

	s.io.Of("/lobby", nil).On("connect", func(clients ...any) {
		LobbySocket(s, clients...)
	})

	return s.io.ServeHandler(nil)
}

func (s *Socket) Close() {
	s.io.Close(nil)
}
