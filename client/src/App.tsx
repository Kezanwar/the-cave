import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Stats } from '@react-three/drei';
import RootScene from './components/scenes/root';
import useInitGame from './hooks/useInitGame';

const keyboardMap = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'run', keys: ['Shift'] }
];

function App() {
  useInitGame();

  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 50 }}>
        <Stats />
        <color attach="background" args={['#ececec']} />
        <RootScene />
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
