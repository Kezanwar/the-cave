package socket

import (
	"TheCave/game"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/zishang520/engine.io/types"
	"github.com/zishang520/socket.io/socket"
)

var opt = &socket.ServerOptions{}

type Socket struct {
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

	io := socket.NewServer(nil, options)

	io.On("connect", func(clients ...any) {
		client := clients[0].(*socket.Socket)

		fmt.Println("Connect")
		fmt.Println(game.Characters)

		client.On("player:join", func(msgs ...any) {
			client.Emit("game:initialize", game.Characters)
			if s.AssertMsgIsMap(msgs[0]) {
				fmt.Println("player:join")
				jsonData, err := s.GetJsonFromSocketMsg(msgs[0])
				if err != nil {
					fmt.Println("player:join -- unable to get json from msg")
					panic(0)
				}
				char := &game.Character{}
				err = json.Unmarshal(jsonData, char)
				if err != nil {
					fmt.Println("player:join -- unable to unmarshal msg to struct")
					panic(0)
				}
				Session[string(client.Id())] = char.Id
				game.AddCharacter(char)
				client.Broadcast().Emit("room:player:join", char)
			}

		})

		client.On("player:reinitialize", func(msgs ...any) {
			fmt.Println("player:reinitialize")
			client.Emit("game:initialize", game.Characters)
		})

		client.On("disconnect", func(msgs ...any) {
			fmt.Println("disconnect")
			id := Session[string(client.Id())]
			if len(id) > 0 {
				game.RemoveCharacter(id)
				client.Broadcast().Emit("room:player:leave", id)
			}

		})

		client.On("player:move", func(msgs ...any) {
			fmt.Println("player:move")
			id := Session[string(client.Id())]

			if len(id) > 0 {

				jsonData, err := s.GetJsonFromSocketMsg(msgs[0])

				if err != nil {
					fmt.Println("player:move -- unable to get json from msg")
					panic(0)
				}

				input := &PlayerMoveInput{}

				err = json.Unmarshal(jsonData, input)
				if err != nil {
					fmt.Println("player:move -- unable to unmarshal msg to struct")
					panic(0)
				}

				// data, ok := msgs[0].([]interface{})

				// if !ok {
				// 	fmt.Println("player:move -- cant cast find position in move")
				// 	panic(0)
				// }

				// var pos = &game.Position{}

				// for i := 0; i < 3; i++ {
				// 	point, ok := data[i].(float64)
				// 	if !ok {
				// 		fmt.Println("player:move -- cant cast interface to float64 in position in move")
				// 		panic(0)
				// 	}
				// 	pos[i] = point
				// }

				game.Characters[id].Position = input.Position
				game.Characters[id].Anim = input.Anim
				game.Characters[id].Rotate = input.Rotate

				client.Broadcast().Emit("room:player:move", &PlayerMoveBroadcast{Id: game.Characters[id].Id, Position: game.Characters[id].Position})
			}

		})

	})

	return io.ServeHandler(nil)
}

// client.On("toserver", func(msg ...any) {
// if data, ok := msg[0].(map[string]interface{}); ok {
// 	// Successfully casted to map[string]string
// 	fmt.Println(data["message"]) // Access the "message" key
// } else {
// 	fmt.Println("msg[0] is not of type map[string]string")
// }
// 	jsonData, err := s.GetJsonFromSocketMsg(msg[0])

// 	if err != nil {
// 		fmt.Println(err)
// 		panic(0)
// 	}

// 	fmt.Println(client.Id())
// 	var payload Payload
// 	if err := json.Unmarshal(jsonData, &payload); err != nil {
// 		fmt.Println("msg[0] is not of type Payload")
// 		panic(0)
// 	}

// 	fmt.Println(payload.Message)
// })
