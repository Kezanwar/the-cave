import { makeObservable, observable, action } from 'mobx';
import { RootStore } from '@app/store/index';
import Random from '@app/util/random';
import { Character, CharacterCommonAnimationNames } from '@app/types/character';
import { Position } from '@app/types/physics';

class PlayerStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      character: observable,
      moveTo: action,
      setStaticAnim: action,
      onStaticAnimationEnd: action
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

  setStaticAnim(anim: CharacterCommonAnimationNames) {
    this.isStaticAnim = true;
    this.character.anim = anim;
    this.moveTo(
      this.character.position,
      this.character.rotate,
      this.character.anim,
      false
    );
  }

  onStaticAnimationEnd() {
    this.character.anim = 'idle';
    this.isStaticAnim = false;
    this.rootStore.lobby.emitPlayerMove(
      this.character.position,
      this.character.rotate,
      this.character.anim
    );
  }

  isStaticAnim = false;

  moveTo(
    pos: Position,
    rotate: number,
    anim: CharacterCommonAnimationNames,
    isLoopedAnim: boolean
  ) {
    this.character.position = pos;
    this.character.rotate = rotate;
    if (isLoopedAnim && !this.isStaticAnim) {
      this.character.anim = anim;
    }
    this.rootStore.lobby.emitPlayerMove(pos, rotate, this.character.anim);
  }
}

export default PlayerStore;
