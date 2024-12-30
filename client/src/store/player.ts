import { makeObservable, observable, action } from 'mobx';
import { RootStore } from '@app/store/index';
import { Character, Position } from './game';
import Random from '@app/util/random';
import { CommonAnimationNames } from '@app/animations';

class PlayerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      character: observable,
      mouseOnFloor: observable,
      setMouseOnFloor: action,
      moveTo: action,
      setAnim: action
    });

    this.rootStore = rootStore;
  }

  character: Character = {
    id: Random.uuid(),
    position: Random.vector3Position(),
    hairColor: Random.hexColorCode(),
    bottomColor: Random.hexColorCode(),
    topColor: Random.hexColorCode(),
    anim: 'idle',
    rotate: 0
  };

  mouseOnFloor = false;

  setMouseOnFloor(bool: boolean) {
    this.mouseOnFloor = bool;
  }

  setAnim(anim: CommonAnimationNames) {
    this.character.anim = anim;
  }

  moveTo(pos: Position, rotate: number, anim: CommonAnimationNames) {
    this.character.position = pos;
    this.character.rotate = rotate;
    this.character.anim = anim;
    this.rootStore.socket.emitPlayerMove(pos, rotate, anim);
  }
}

export default PlayerStore;
