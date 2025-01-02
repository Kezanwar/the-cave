package lobby

import (
	"TheCave/entities"
)

var Characters = make(map[string]*entities.Character)

func AddCharacter(c *entities.Character) {
	Characters[c.Id] = c
}

func RemoveCharacter(id string) {
	delete(Characters, id)
}
