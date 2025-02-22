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
import { BASE_URL } from '@app/config';
import { EmitMoveFn } from '@app/types/game';
import Random from '@app/lib/random';

const lobby = io(`${BASE_URL}/lobby`);

/**
 *  handles socket connection for lobby
 */
class LobbyStore {
  rootStore: RootStore;

  game: LobbyGame; // actual stateful game logic for lobby

  constructor(rootStore: RootStore) {
    makeObservable(this, {});
    this.rootStore = rootStore;
    this.game = new LobbyGame(this.emitPlayerMove);
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

  emitPlayerMove: EmitMoveFn = (position, rotate, anim) => {
    lobby.emit('player:move', { position, rotate, anim });
  };

  emitGameReinitialize = () => {
    lobby.emit('player:reinitialize');
  };

  on() {
    lobby.connect();
    lobby.on('disconnect', this.onDisconnect);

    lobby.on('game:initialize', this.onGameInitialize);

    lobby.on('room:player:join', this.onRoomPlayerJoin);
    lobby.on('room:player:leave', this.onRoomPlayerLeave);
    lobby.on('room:player:move', this.onRoomPlayerMove);

    window.addEventListener('focus', this.emitGameReinitialize);

    this.game.player.initCharacter({
      uuid: Random.uuid(),
      position: Random.vector3Position(),
      hair_color: Random.hexColorCode(),
      top_color: Random.hexColorCode(),
      bottom_color: Random.hexColorCode(),
      anim: 'idle',
      rotate: 0
    });

    this.emitPlayerJoin(this.game.player.character);
  }

  off() {
    lobby.disconnect();
    lobby.off('disconnect', this.onDisconnect);

    lobby.off('game:initialize', this.onGameInitialize);

    lobby.off('room:player:join', this.onRoomPlayerJoin);
    lobby.off('room:player:leave', this.onRoomPlayerLeave);
    lobby.off('room:player:move', this.onRoomPlayerMove);

    window.removeEventListener('focus', this.emitGameReinitialize);
  }
}

export default LobbyStore;
