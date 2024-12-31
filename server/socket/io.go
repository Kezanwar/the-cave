package socket

import "TheCave/game"

type PlayerMoveInput struct {
	Position game.Position
	Rotate   float64 `json:"Rotate"`
	Anim     string  `json:"anim"`
}

type PlayerMoveBroadcast struct {
	Id       string        `json:"id"`
	Position game.Position `json:"position"`
	Rotate   float64       `json:"rotate"`
	Anim     string        `json:"anim"`
}
