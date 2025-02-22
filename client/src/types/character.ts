import { Position } from './physics';

export type Character = {
  uuid: string;
  hair_color: string;
  top_color: string;
  bottom_color: string;
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
  uuid: string;
  position: Position;
  rotate: number;
  anim: CharacterCommonAnimationNames;
};
