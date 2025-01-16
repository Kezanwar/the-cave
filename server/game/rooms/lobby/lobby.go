package lobby

import "TheCave/game/entities"

var Players = make(map[string]*entities.Player)

func AddPlayer(c *entities.Player) {
	Players[c.Id] = c
}

func RemovePlayer(id string) {
	delete(Players, id)
}
