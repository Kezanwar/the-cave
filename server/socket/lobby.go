package socket

import (
	"TheCave/game/entities"
	"TheCave/game/rooms/lobby"

	"TheCave/socket/session"

	"encoding/json"
	"fmt"

	"github.com/zishang520/socket.io/socket"
)

var session_map = session.New()

func LobbySocket(clients ...any) {
	client := clients[0].(*socket.Socket)

	fmt.Println("Connect")
	fmt.Println(lobby.Players)

	client.On("player:join", func(msgs ...any) {
		client.Emit("game:initialize", lobby.Players)
		if AssertMsgIsMap(msgs[0]) {
			fmt.Println("player:join")
			jsonData, err := GetJsonFromSocketMsg(msgs[0])
			if err != nil {
				fmt.Println("player:join -- unable to get json from msg")
				panic(0)
			}
			char := &entities.Player{}
			err = json.Unmarshal(jsonData, char)
			if err != nil {
				fmt.Println("player:join -- unable to unmarshal msg to struct")
				panic(0)
			}
			session_map.AddSession(client.Id(), char.Id)
			lobby.AddPlayer(char)
			client.Broadcast().Emit("room:player:join", char)
		}

	})

	client.On("player:reinitialize", func(msgs ...any) {
		fmt.Println("player:reinitialize")
		client.Emit("game:initialize", lobby.Players)
	})

	client.On("disconnect", func(msgs ...any) {
		fmt.Println("disconnect")
		socketID := client.Id()
		id := session_map.GetPlayerID(socketID)
		if len(id) > 0 {
			session_map.RemoveSession(socketID)
			lobby.RemovePlayer(id)
			client.Broadcast().Emit("room:player:leave", id)
		}

	})

	client.On("player:move", func(msgs ...any) {
		fmt.Println("player:move")
		id := session_map.GetPlayerID(client.Id())

		if len(id) > 0 {

			go func() {
				jsonData, err := GetJsonFromSocketMsg(msgs[0])

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
				lobby.Players[id].Position = input.Position
				lobby.Players[id].Anim = input.Anim
				lobby.Players[id].Rotate = input.Rotate

				client.Broadcast().Emit("room:player:move", &PlayerMoveBroadcast{
					Id:       lobby.Players[id].Id,
					Position: lobby.Players[id].Position,
					Rotate:   lobby.Players[id].Rotate,
					Anim:     lobby.Players[id].Anim})
			}()

		}

	})

}
