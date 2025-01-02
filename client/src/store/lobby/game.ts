import { action, computed, makeObservable, observable } from 'mobx';
import { RootStore } from '..';
import {
  Character,
  MoveCharacterBroadcast,
  ServerCharactersMap
} from '@app/types/character';

class LobbyGame {
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

  initialize(characters: ServerCharactersMap) {
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

  moveCharacter(data: MoveCharacterBroadcast) {
    const c = this.characters.get(data.id);
    if (c) {
      c.position = data.position;
      c.rotate = data.rotate;
      c.anim = data.anim;
    }
  }
}

export default LobbyGame;
