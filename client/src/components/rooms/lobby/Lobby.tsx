import React, { FC, ReactNode } from 'react';
import Floor from './components/Floor';
import Wall from './components/Wall';
import { Position } from '@app/store/game';
import { Euler } from '@react-three/fiber';

type Props = {
  children: ReactNode;
};

const WALL_POSITIONS = {
  TOP: {
    position: [0, 5, -20] as Position,
    rotation: [0, 0, 0] as Euler
  },
  RIGHT: {
    position: [20, 5, 0] as Position,
    rotation: [0, Math.PI / 2, 0] as Euler
  },
  BOTTOM: {
    position: [0, 5, 20] as Position,
    rotation: [0, 0, 0] as Euler
  },
  LEFT: {
    position: [-20, 5, 0] as Position,
    rotation: [0, Math.PI / 2, 0] as Euler
  }
};

const Lobby: FC<Props> = ({ children }) => {
  return (
    <group>
      <Floor />
      <Wall
        colour="purple"
        position={WALL_POSITIONS.TOP.position}
        rotation={WALL_POSITIONS.TOP.rotation}
      />
      <Wall
        colour={'orange'}
        position={WALL_POSITIONS.RIGHT.position}
        rotation={WALL_POSITIONS.RIGHT.rotation}
      />
      <Wall
        colour="cyan"
        position={WALL_POSITIONS.BOTTOM.position}
        rotation={WALL_POSITIONS.BOTTOM.rotation}
      />
      <Wall
        position={WALL_POSITIONS.LEFT.position}
        rotation={WALL_POSITIONS.LEFT.rotation}
        colour={'pink'}
      />
      {children}
    </group>
  );
};

export default Lobby;
