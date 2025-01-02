import { Position } from './physics';

export type Character = {
  id: string;
  hairColor: string;
  topColor: string;
  bottomColor: string;
  position: Position;
  rotate: number;
  anim: CharacterCommonAnimationNames;
};

export type CharacterCommonAnimationNames =
  | 'run'
  | 'run_back'
  | 'run_right'
  | 'run_left'
  | 'idle'
  | 'walk'
  | 'jump'
  | 'wave';

export type ServerCharactersMap = {
  [key: string]: Character;
};

export type MoveCharacterBroadcast = {
  id: string;
  position: Position;
  rotate: number;
  anim: CharacterCommonAnimationNames;
};
