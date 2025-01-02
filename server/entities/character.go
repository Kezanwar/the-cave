package entities

import "TheCave/physics"

type Character struct {
	Id          string           `json:"id"`
	HairColor   string           `json:"hairColor"`
	TopColor    string           `json:"topColor"`
	BottomColor string           `json:"bottomColor"`
	Position    physics.Position `json:"position"`
	Rotate      physics.RotateY  `json:"rotate"`
	Anim        string           `json:"anim"`
}
