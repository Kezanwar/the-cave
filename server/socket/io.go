package socket

import (
	"TheCave/game/physics"
	"encoding/json"
	"fmt"
)

type PlayerMoveInput struct {
	Position physics.Position
	Rotate   physics.RotateY `json:"Rotate"`
	Anim     string          `json:"anim"`
}

type PlayerMoveBroadcast struct {
	UUID     string           `json:"uuid"`
	Position physics.Position `json:"position"`
	Rotate   physics.RotateY  `json:"rotate"`
	Anim     string           `json:"anim"`
}

func GetJsonFromSocketMsg(msg any) ([]byte, error) {
	raw, ok := msg.(map[string]interface{})

	if !ok {
		return nil, fmt.Errorf("socket.GetJsonFromSocket: msg is not a map[string]interface{}")
	}

	jsonData, err := json.Marshal(raw)

	if err != nil {
		return nil, fmt.Errorf("socket.GetJsonFromSocket: unable to marshal msg to JSON")
	}

	return jsonData, nil
}

func AssertMsgIsMap(msg any) bool {
	_, ok := msg.(map[string]interface{})
	return ok
}
