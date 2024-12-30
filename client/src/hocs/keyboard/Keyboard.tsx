import { FC, ReactNode } from 'react';
import { KeyboardControls, KeyboardControlsEntry } from '@react-three/drei';

export enum Controls {
  forward = 'forward',
  back = 'back',
  left = 'left',
  right = 'right',
  jump = 'jump'
}

const map: KeyboardControlsEntry<Controls>[] = [
  { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
  { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
  { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
  { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
  { name: Controls.jump, keys: ['Space'] }
];

type Props = { children: ReactNode };

const Keyboard: FC<Props> = ({ children }) => {
  return <KeyboardControls map={map}>{children}</KeyboardControls>;
};

export default Keyboard;
