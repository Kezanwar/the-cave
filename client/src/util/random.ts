import { Position } from '@app/store/game';
import { Vector3 } from '@react-three/fiber';
import { v4 } from 'uuid';

class Random {
  static randomBetweenOneAndTwo() {
    return Math.random() * (-2 - 2) + 0;
  }

  static vector3Position(): Position {
    return [this.randomBetweenOneAndTwo(), 0, this.randomBetweenOneAndTwo()];
  }

  static hexColorCode() {
    const n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
  }

  static uuid() {
    return v4();
  }
}

export default Random;
