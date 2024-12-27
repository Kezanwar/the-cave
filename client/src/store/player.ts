import { makeObservable, observable, action } from 'mobx';
import { RootStore } from '@app/store/index';
import { Character } from './game';
import Random from '@app/util/random';

class PlayerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      character: observable,
      mouseOnFloor: observable,
      setMouseOnFloor: action,
      moveTo: action
    });

    this.rootStore = rootStore;
  }

  character: Character = {
    id: Random.uuid(),
    position: Random.vector3Position(),
    hairColor: Random.hexColorCode(),
    bottomColor: Random.hexColorCode(),
    topColor: Random.hexColorCode()
  };

  mouseOnFloor = false;

  setMouseOnFloor(bool: boolean) {
    this.mouseOnFloor = bool;
  }

  moveTo(pos: number[]) {
    this.character.position = pos;
    this.rootStore.socket.emitPlayerMove(pos);
  }
}

export default PlayerStore;
