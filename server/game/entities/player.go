package entities

import "TheCave/game/physics"

type Player struct {
	Id          string           `json:"id"`
	HairColor   string           `json:"hairColor"`
	TopColor    string           `json:"topColor"`
	BottomColor string           `json:"bottomColor"`
	Position    physics.Position `json:"position"`
	Rotate      physics.RotateY  `json:"rotate"`
	Anim        string           `json:"anim"`
}
