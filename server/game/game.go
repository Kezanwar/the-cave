package game

var Characters = make(map[string]*Character)

func AddCharacter(c *Character) {
	Characters[c.Id] = c
}

func RemoveCharacter(id string) {
	delete(Characters, id)
}
