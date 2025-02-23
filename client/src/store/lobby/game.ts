import { action, computed, makeObservable, observable } from 'mobx';
import {
  Character,
  MoveCharacterBroadcast,
  ServerCharactersMap
} from '@app/types/character';
import PlayerStore from '../common/player';
import { EmitMoveFn } from '@app/types/game';

class LobbyGame {
  emitPlayerMove: EmitMoveFn;

  constructor(emitPlayerMove: EmitMoveFn) {
    makeObservable(this, {
      characters: observable,
      displayCharacters: computed,
      initialize: action,
      removeCharacter: action,
      addCharacter: action,
      moveCharacter: action,
      isInitialized: observable
    });
    this.emitPlayerMove = emitPlayerMove;

    this.player = new PlayerStore(emitPlayerMove);
  }

  isInitialized = false;

  player: PlayerStore;

  characters: Map<string, Character> = new Map();

  get displayCharacters() {
    return [...this.characters.values()];
  }

  initialize(characters: ServerCharactersMap) {
    for (const [key, value] of Object.entries(characters)) {
      if (!(this.player.character.uuid === key)) {
        this.characters.set(key, value);
      }
    }
    this.isInitialized = true;
  }

  addCharacter(c: Character) {
    this.characters.set(c.uuid, c);
  }

  removeCharacter(id: string) {
    this.characters.delete(id);
  }

  moveCharacter(data: MoveCharacterBroadcast) {
    const c = this.characters.get(data.uuid);

    if (c) {
      c.position = data.position;
      c.rotate = data.rotate;
      c.anim = data.anim;
    }
  }

  reset() {
    this.characters.clear();
  }
}

export default LobbyGame;
