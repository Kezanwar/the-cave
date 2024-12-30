import { makeObservable, observable, action, computed } from 'mobx';
import { RootStore } from '@app/store/index';
import { CommonAnimationNames } from '@app/animations';

export type Position = [number, number, number];

export type Character = {
  id: string;
  hairColor: string;
  topColor: string;
  bottomColor: string;
  position: [number, number, number];
  rotate: number;
  anim: CommonAnimationNames;
};

export type initCharacters = {
  [key: string]: Character;
};

class GameStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      characters: observable,
      displayCharacters: computed,
      initialize: action,
      removeCharacter: action,
      addCharacter: action,
      moveCharacter: action
    });

    this.rootStore = rootStore;
  }

  characters: Map<string, Character> = new Map();

  get displayCharacters() {
    return [...this.characters.values()];
  }

  initialize(characters: initCharacters) {
    for (const [key, value] of Object.entries(characters)) {
      if (!(this.rootStore.player.character.id === key)) {
        this.characters.set(key, value);
      }
    }
  }

  addCharacter(c: Character) {
    this.characters.set(c.id, c);
  }

  removeCharacter(id: string) {
    this.characters.delete(id);
  }

  moveCharacter(id: string, position: Position) {
    const c = this.characters.get(id);
    if (c) {
      c.position = position;
    }
  }
}

export default GameStore;
