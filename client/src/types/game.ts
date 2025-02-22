import { CharacterCommonAnimationNames } from './character';
import { Position, RotateY } from './physics';

export type EmitMoveFn = (
  position: Position,
  rotate: RotateY,
  anim: CharacterCommonAnimationNames
) => void;
