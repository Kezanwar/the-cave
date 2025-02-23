package lobby

import (
	"TheCave/game/entities"
	"TheCave/game/physics"
	"sync"
)

var (
	Players          = make(map[string]*entities.Player)
	players_mutex    sync.RWMutex // Protects access to the Players map itself
	player_mutex_map sync.Map     // Per-player locks
)

func getPlayerMutex(uuid string) *sync.Mutex {
	m, _ := player_mutex_map.LoadOrStore(uuid, &sync.Mutex{})
	return m.(*sync.Mutex)
}

// ✅ Protects the Players map
func AddPlayer(c *entities.Player) {
	players_mutex.Lock()
	Players[c.UUID] = c
	players_mutex.Unlock()
}

// ✅ Protects the Players map
func RemovePlayer(uuid string) {
	players_mutex.Lock()
	delete(Players, uuid)
	players_mutex.Unlock()
	player_mutex_map.Delete(uuid) // Cleanup mutex when player is removed
}

// ✅ Per-player lock (Does NOT block global reads)
func MovePlayer(uuid string, position physics.Position, rotate physics.RotateY, anim string) {
	pmu := getPlayerMutex(uuid) // Get player's own mutex
	pmu.Lock()
	defer pmu.Unlock()

	players_mutex.RLock() // Read lock to safely access Players map
	player, exists := Players[uuid]
	players_mutex.RUnlock()

	if exists {
		player.Position = position
		player.Anim = anim
		player.Rotate = rotate
	}
}

// ✅ Safe read for the total number of players
func GetTotalPlayers() int {
	players_mutex.RLock()
	defer players_mutex.RUnlock()
	return len(Players)
}

func GetRoom() *map[string]*entities.Player {
	players_mutex.RLock()
	defer players_mutex.RUnlock()
	return &Players
}
