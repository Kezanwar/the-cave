package socketio

import (
	"TheCave/physics"
)

type PlayerMoveInput struct {
	Position physics.Position
	Rotate   physics.RotateY `json:"Rotate"`
	Anim     string          `json:"anim"`
}

type PlayerMoveBroadcast struct {
	Id       string           `json:"id"`
	Position physics.Position `json:"position"`
	Rotate   physics.RotateY  `json:"rotate"`
	Anim     string           `json:"anim"`
}
