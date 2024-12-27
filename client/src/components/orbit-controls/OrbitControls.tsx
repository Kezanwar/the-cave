import { OrbitControls as Orbit } from '@react-three/drei';
import { observer } from 'mobx-react-lite';
import store from '@app/store';

const OrbitControls = observer(() => {
  const enabled = !store.player.mouseOnFloor;
  return <Orbit enableRotate={enabled} enablePan={enabled} />;
});

export default OrbitControls;
