package handlers

import (
	"TheCave/api/output"
	"TheCave/game/rooms/lobby"
	"net/http"
)

type RoomsMetaResp struct {
	Lobby int `json:"lobby"`
}

func Get_Rooms_Meta(w http.ResponseWriter, r *http.Request) (int, error) {
	defer r.Body.Close()
	lobby_count := lobby.GetTotalPlayers()
	return output.SuccessResponse(w, r, &RoomsMetaResp{
		Lobby: lobby_count,
	})
}
