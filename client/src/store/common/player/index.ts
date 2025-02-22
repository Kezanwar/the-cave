import { makeObservable, observable, action } from 'mobx';
import Random from '@app/lib/random';
import { Character, CharacterCommonAnimationNames } from '@app/types/character';
import { Position } from '@app/types/physics';
import { EmitMoveFn } from '@app/types/game';

class PlayerStore {
  emitPlayerMove: EmitMoveFn;
  constructor(emitPlayerMove: EmitMoveFn) {
    makeObservable(this, {
      character: observable,
      moveTo: action,
      setStaticAnim: action,
      onStaticAnimationEnd: action,
      initCharacter: action
    });

    this.emitPlayerMove = emitPlayerMove;
  }

  character: Character = {
    uuid: Random.uuid(),
    position: Random.vector3Position(),
    hair_color: Random.hexColorCode(),
    top_color: Random.hexColorCode(),
    bottom_color: Random.hexColorCode(),
    anim: 'idle',
    rotate: 0
  };

  initCharacter(c: Character) {
    this.character = c;
  }

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
    this.emitPlayerMove(
      this.character.position,
      this.character.rotate,
      this.character.anim
    );
    // this.rootStore.lobby.emitPlayerMove(
    //   this.character.position,
    //   this.character.rotate,
    //   this.character.anim
    // );
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
    this.emitPlayerMove(pos, rotate, this.character.anim);
    // this.rootStore.lobby.emitPlayerMove(pos, rotate, this.character.anim);
  }
}

export default PlayerStore;
