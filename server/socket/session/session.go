package session

import "github.com/zishang520/socket.io/socket"

func New() *Session {
	s := &Session{}
	/* map[sessionid]player_uuid */
	s.session = make(map[string]string)
	return s
}

type Session struct {
	session map[string]string
}

func (s *Session) AddSession(sessionid socket.SocketId, charid string) {
	s.session[string(sessionid)] = charid
}

func (s *Session) RemoveSession(sessionid socket.SocketId) {
	delete(s.session, string(sessionid))
}

func (s *Session) GetPlayerUUID(sessionid socket.SocketId) string {
	return s.session[string(sessionid)]
}
