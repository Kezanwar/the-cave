package game

type Position = [3]float64

type Character struct {
	Id          string   `json:"id"`
	HairColor   string   `json:"hairColor"`
	TopColor    string   `json:"topColor"`
	BottomColor string   `json:"bottomColor"`
	Position    Position `json:"position"`
	Rotate      float64  `json:"rotate"`
	Anim        string   `json:"anim"`
}
