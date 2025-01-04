package socketio

import (
	"TheCave/game/entities"
	"TheCave/game/rooms/lobby"
	"TheCave/socket/session"

	"encoding/json"
	"fmt"

	"github.com/zishang520/socket.io/socket"
)

var session_map = session.NewSession()

func LobbySocket(s *Socket, clients ...any) {
	client := clients[0].(*socket.Socket)

	fmt.Println("Connect")
	fmt.Println(lobby.Characters)

	client.On("player:join", func(msgs ...any) {
		client.Emit("game:initialize", lobby.Characters)
		if s.AssertMsgIsMap(msgs[0]) {
			fmt.Println("player:join")
			jsonData, err := s.GetJsonFromSocketMsg(msgs[0])
			if err != nil {
				fmt.Println("player:join -- unable to get json from msg")
				panic(0)
			}
			char := &entities.Character{}
			err = json.Unmarshal(jsonData, char)
			if err != nil {
				fmt.Println("player:join -- unable to unmarshal msg to struct")
				panic(0)
			}
			session_map.AddSession(client.Id(), char.Id)
			lobby.AddCharacter(char)
			client.Broadcast().Emit("room:player:join", char)
		}

	})

	client.On("player:reinitialize", func(msgs ...any) {
		fmt.Println("player:reinitialize")
		client.Emit("game:initialize", lobby.Characters)
	})

	client.On("disconnect", func(msgs ...any) {
		fmt.Println("disconnect")
		socketID := client.Id()
		id := session_map.GetCharacterID(socketID)
		if len(id) > 0 {
			session_map.RemoveSession(socketID)
			lobby.RemoveCharacter(id)
			client.Broadcast().Emit("room:player:leave", id)
		}

	})

	client.On("player:move", func(msgs ...any) {
		fmt.Println("player:move")
		id := session_map.GetCharacterID(client.Id())

		if len(id) > 0 {

			go func() {
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
				lobby.Characters[id].Position = input.Position
				lobby.Characters[id].Anim = input.Anim
				lobby.Characters[id].Rotate = input.Rotate

				client.Broadcast().Emit("room:player:move", &PlayerMoveBroadcast{
					Id:       lobby.Characters[id].Id,
					Position: lobby.Characters[id].Position,
					Rotate:   lobby.Characters[id].Rotate,
					Anim:     lobby.Characters[id].Anim})
			}()

		}

	})

}
