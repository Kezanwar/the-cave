package socketio

import "github.com/zishang520/socket.io/socket"

func NewSession() *Session {
	s := &Session{}
	/* map[sessionid]characterid */
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

func (s *Session) GetCharacterID(sessionid socket.SocketId) string {
	return s.session[string(sessionid)]
}
