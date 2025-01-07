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
	Id       string           `json:"id"`
	Position physics.Position `json:"position"`
	Rotate   physics.RotateY  `json:"rotate"`
	Anim     string           `json:"anim"`
}

func GetJsonFromSocketMsg(msg any) ([]byte, error) {
	raw, ok := msg.(map[string]interface{})
	if !ok {
		fmt.Println("msg is not a map[string]interface{}")
		return nil, fmt.Errorf("msg is not a map")
	}

	jsonData, err := json.Marshal(raw)
	if err != nil {
		fmt.Println("Error marshaling to JSON:", err)
		return nil, fmt.Errorf("unable to marshal msg to json")
	}

	return jsonData, nil
}

func AssertMsgIsMap(msg any) bool {
	_, ok := msg.(map[string]interface{})
	return ok
}
