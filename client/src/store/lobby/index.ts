import { makeObservable } from 'mobx';
import { RootStore } from '@app/store/index';
import {
  Character,
  CharacterCommonAnimationNames,
  MoveCharacterBroadcast,
  ServerCharactersMap
} from '@app/types/character';
import { io } from 'socket.io-client';
import { Position, RotateY } from '@app/types/physics';
import LobbyGame from './game';

const lobby = io('http://localhost:3000/lobby');

/**
 *  handles socket connection for lobby
 */
class LobbyStore {
  rootStore: RootStore;

  game: LobbyGame; // actual stateful game logic for lobby

  constructor(rootStore: RootStore) {
    makeObservable(this, {});
    this.rootStore = rootStore;
    this.game = new LobbyGame(rootStore);
  }

  onDisconnect = () => {
    console.log('disconnected!');
  };

  //LISTEN CLIENT HANDLERS

  onGameInitialize = (characters: ServerCharactersMap) => {
    this.game.initialize(characters);
  };

  //LISTEN BROADCAST HANDLERS

  onRoomPlayerJoin = (character: Character) => {
    this.game.addCharacter(character);
  };

  onRoomPlayerLeave = (id: string) => {
    this.game.removeCharacter(id);
  };

  onRoomPlayerMove = (data: MoveCharacterBroadcast) => {
    this.game.moveCharacter(data);
  };

  //EMIT EVENT HANDLERS

  emitPlayerJoin(char: Character) {
    lobby.emit('player:join', char);
  }

  emitPlayerMove(
    position: Position,
    rotate: RotateY,
    anim: CharacterCommonAnimationNames
  ) {
    lobby.emit('player:move', { position, rotate, anim });
  }

  emitGameReinitialize = () => {
    lobby.emit('player:reinitialize');
  };

  on() {
    lobby.on('disconnect', this.onDisconnect);

    lobby.on('game:initialize', this.onGameInitialize);

    lobby.on('room:player:join', this.onRoomPlayerJoin);
    lobby.on('room:player:leave', this.onRoomPlayerLeave);
    lobby.on('room:player:move', this.onRoomPlayerMove);

    window.addEventListener('focus', this.emitGameReinitialize);

    this.emitPlayerJoin(this.rootStore.player.character);
  }

  off() {
    lobby.off('disconnect', this.onDisconnect);

    lobby.off('game:initialize', this.onGameInitialize);

    lobby.off('room:player:join', this.onRoomPlayerJoin);
    lobby.off('room:player:leave', this.onRoomPlayerLeave);
    lobby.off('room:player:move', this.onRoomPlayerMove);

    window.removeEventListener('focus', this.emitGameReinitialize);
  }
}

export default LobbyStore;
