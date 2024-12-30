import { useKeyboardControls } from '@react-three/drei';
import { Controls } from './Keyboard';

const useKeyboard = () => {
  const c = useKeyboardControls<Controls>();
  return c;
};

export default useKeyboard;
