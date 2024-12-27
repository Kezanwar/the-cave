package socket

import "the-spot/game"

type Socket struct {
}

type RoomPlayerMoveBroadcast struct {
	Id       string        `json:"id"`
	Position game.Position `json:"position"`
}
