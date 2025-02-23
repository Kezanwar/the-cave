package entities

import "TheCave/game/physics"

type Player struct {
	UUID        string           `json:"uuid"`
	HairColor   string           `json:"hair_color"`
	TopColor    string           `json:"top_color"`
	BottomColor string           `json:"bottom_color"`
	Position    physics.Position `json:"position"`
	Rotate      physics.RotateY  `json:"rotate"`
	Anim        string           `json:"anim"`
}
