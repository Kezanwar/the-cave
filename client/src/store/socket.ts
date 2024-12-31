import { makeObservable } from 'mobx';
import { io } from 'socket.io-client';
import { RootStore } from '@app/store/index';
import { Character, initCharacters, Position } from './game';

import { CommonAnimationNames } from '@app/animations';

const socket = io('http://localhost:3000');

export type MoveCharacterBroadcast = {
  id: string;
  position: Position;
  rotate: number;
  anim: CommonAnimationNames;
};

class SocketStore {
  constructor(rootStore: RootStore) {
    makeObservable(this, {});

    this.rootStore = rootStore;
  }

  rootStore: RootStore;

  onDisconnect = () => {
    console.log('disconnected!');
  };

  onGameInitialize = (characters: initCharacters) => {
    this.rootStore.game.initialize(characters);
  };

  onRoomPlayerJoin = (character: Character) => {
    this.rootStore.game.addCharacter(character);
  };

  onRoomPlayerLeave = (id: string) => {
    this.rootStore.game.removeCharacter(id);
  };

  onRoomPlayerMove = (data: MoveCharacterBroadcast) => {
    this.rootStore.game.moveCharacter(data);
  };

  emitPlayerJoin(char: Character) {
    socket.emit('player:join', char);
  }

  emitPlayerMove(
    position: Position,
    rotate: number,
    anim: CommonAnimationNames
  ) {
    socket.emit('player:move', { position, rotate, anim });
  }

  emitGameReinitialize = () => {
    socket.emit('player:reinitialize');
  };

  on() {
    socket.on('disconnect', this.onDisconnect);

    socket.on('game:initialize', this.onGameInitialize);

    socket.on('room:player:join', this.onRoomPlayerJoin);
    socket.on('room:player:leave', this.onRoomPlayerLeave);
    socket.on('room:player:move', this.onRoomPlayerMove);

    window.addEventListener('focus', this.emitGameReinitialize);

    this.emitPlayerJoin(this.rootStore.player.character);
  }

  off() {
    socket.off('disconnect', this.onDisconnect);

    socket.off('game:initialize', this.onGameInitialize);

    socket.off('room:player:join', this.onRoomPlayerJoin);
    socket.off('room:player:leave', this.onRoomPlayerLeave);
    socket.off('room:player:move', this.onRoomPlayerMove);

    window.removeEventListener('focus', this.emitGameReinitialize);
  }
}

export default SocketStore;
