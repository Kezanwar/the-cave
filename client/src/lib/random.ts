import { Position } from '@app/types/physics';
import { v4 } from 'uuid';

class Random {
  static randomPoint() {
    return Math.random() * (-2 - 2) + 0;
  }

  static vector3Position(): Position {
    return [this.randomPoint(), 0, this.randomPoint()];
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
