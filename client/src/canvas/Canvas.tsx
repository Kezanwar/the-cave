import Keyboard from '@app/hocs/keyboard';
import RootScene from '@app/scenes/root';
import { Stats } from '@react-three/drei';
import { Canvas as FiberCanvas } from '@react-three/fiber';
import React, { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const Canvas: FC<Props> = ({ children }) => {
  return (
    <Keyboard>
      <FiberCanvas shadows>
        <Stats />
        <color attach="background" args={['#ececec']} />
        <RootScene>{children}</RootScene>
      </FiberCanvas>
    </Keyboard>
  );
};

export default Canvas;
