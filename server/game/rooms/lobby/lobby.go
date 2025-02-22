package lobby

import (
	"TheCave/game/entities"
	"TheCave/game/physics"
	"sync"
)

var (
	Players   = make(map[string]*entities.Player)
	playersMu sync.RWMutex // Protects access to the Players map itself
	muMap     sync.Map     // Per-player locks
)

func getPlayerMutex(id string) *sync.Mutex {
	m, _ := muMap.LoadOrStore(id, &sync.Mutex{})
	return m.(*sync.Mutex)
}

// ✅ Protects the Players map
func AddPlayer(c *entities.Player) {
	playersMu.Lock()
	Players[c.Id] = c
	playersMu.Unlock()
}

// ✅ Protects the Players map
func RemovePlayer(id string) {
	playersMu.Lock()
	delete(Players, id)
	playersMu.Unlock()
	muMap.Delete(id) // Cleanup mutex when player is removed
}

// ✅ Per-player lock (Does NOT block global reads)
func MovePlayer(id string, position physics.Position, rotate physics.RotateY, anim string) {
	mu := getPlayerMutex(id) // Get player's own mutex
	mu.Lock()
	defer mu.Unlock()

	playersMu.RLock() // Read lock to safely access Players map
	player, exists := Players[id]
	playersMu.RUnlock()

	if exists {
		player.Position = position
		player.Anim = anim
		player.Rotate = rotate
	}
}

// ✅ Safe read for the total number of players
func GetTotalPlayers() int {
	playersMu.RLock()
	defer playersMu.RUnlock()
	return len(Players)
}

func GetRoom() *map[string]*entities.Player {
	playersMu.RLock()
	defer playersMu.RUnlock()
	return &Players
}
