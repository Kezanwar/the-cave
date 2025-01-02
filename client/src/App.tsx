import { Canvas } from '@react-three/fiber';
import { Stats } from '@react-three/drei';
import Keyboard from './hocs/keyboard';
import RootScene from './scenes/root';

function App() {
  return (
    <Keyboard>
      <Canvas shadows>
        <Stats />
        <color attach="background" args={['#ececec']} />
        <RootScene />
      </Canvas>
    </Keyboard>
  );
}

export default App;
