import { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { CommonAnimationNames } from '@app/animations';
import { Controls } from '@app/hocs/keyboard';
import store from '@app/store';
import { Position } from '@app/store/game';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { Group, Vector3 } from 'three';

const speed = 3; // Movement speed
const rotationSpeed = Math.PI * 0.5; // Rotation speed (radians per second)
const delta = 1 / 60; // Approximate frame delta for consistent behavior

type Props = { children?: ReactNode };

const ThirdPersonController: FC<Props> = ({ children }) => {
  const startPos: Position = useMemo(() => {
    return [...store.player.character.position];
  }, []);

  const ref = useRef<Group>(null);

  const [sub, get] = useKeyboardControls<Controls>();

  useEffect(() => {
    return sub(
      (state) => state.wave,
      (pressed) => {
        if (pressed && store.player.character.anim !== 'wave') {
          store.player.setStaticAnim('wave');
        }
      }
    );
  }, []);

  // Store the last sent position/rotation to avoid redundant emits

  useFrame(({ camera }) => {
    if (!ref.current) return;

    let hasMoved = false; // Track if the character has moved

    let anim: CommonAnimationNames = 'idle';

    // Forward movement (W key)
    if (get().forward) {
      ref.current.position.z -=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.x -=
        Math.sin(ref.current.rotation.y) * speed * delta;

      // Rotate left
      if (get().left) {
        ref.current.rotation.y += rotationSpeed * delta;
      }

      // Rotate right
      if (get().right) {
        ref.current.rotation.y -= rotationSpeed * delta;
      }

      hasMoved = true;
      anim = 'run';
    }

    // Backward movement
    if (get().back) {
      ref.current.position.z +=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.x +=
        Math.sin(ref.current.rotation.y) * speed * delta;

      // Rotate left
      if (get().left) {
        ref.current.rotation.y += rotationSpeed * delta;
      }

      // Rotate right
      if (get().right) {
        ref.current.rotation.y -= rotationSpeed * delta;
      }

      hasMoved = true;
      anim = 'run_back';
    }

    const animChanged = anim !== store.player.character.anim;

    if (get().left && !get().forward && !get().back) {
      ref.current.position.x -=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.z +=
        Math.sin(ref.current.rotation.y) * speed * delta;
      hasMoved = true;
      anim = 'run_left';
    }

    // Walk right (D key without forward/backward)
    if (get().right && !get().forward && !get().back) {
      ref.current.position.x +=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.z -=
        Math.sin(ref.current.rotation.y) * speed * delta;
      hasMoved = true;
      anim = 'run_right';
    }

    if (get().rotate_left && !get().forward && !get().back && !get().left) {
      ref.current.rotation.y += rotationSpeed * delta;
      hasMoved = true;
    }

    if (get().rotate_right && !get().forward && !get().back && !get().right) {
      ref.current.rotation.y -= rotationSpeed * delta;
      hasMoved = true;
    }

    if (hasMoved || (animChanged && !store.player.isStaticAnim)) {
      const newPos = ref.current.position.toArray() as Position;
      const newRotate = ref.current.rotation.y;

      // Emit position/rotation only if there's a meaningful change

      let positionChanged = false;

      positionChanged = newPos.some(
        (val, i) => Math.abs(val - store.player.character.position[i]) > 0.01
      );

      let rotationChanged = false;

      rotationChanged =
        Math.abs(newRotate - store.player.character.rotate) > 0.01;

      if (positionChanged || rotationChanged || animChanged) {
        store.player.moveTo(newPos, newRotate, anim, true);
      }

      // firstRender.current = false;
    }

    const offset = new Vector3(0, 3, 3); // Camera offset relative to character

    const lookOffset = new Vector3(0, 0, -3);

    const characterPosition = ref.current.position.clone();
    const offsetPosition = characterPosition
      .clone()
      .add(offset.applyQuaternion(ref.current.quaternion)); // Apply character rotation to offset
    const offsetLookAt = characterPosition
      .clone()
      .add(lookOffset.applyQuaternion(ref.current.quaternion));

    camera.position.lerp(offsetPosition, 0.1); // Smooth transition to new position
    camera.lookAt(offsetLookAt);
  });

  return (
    <group ref={ref} position={startPos}>
      {children}
    </group>
  );
};

export default ThirdPersonController;
