// import { useKeyboardControls } from '@react-three/drei';
import { CommonAnimationNames } from '@app/animations';
import store from '@app/store';
import { Position } from '@app/store/game';
import { OrbitControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { useControls } from 'leva';
import React, { FC, ReactNode, useMemo, useRef, useState } from 'react';
import { Group, Vector3 } from 'three';
import { useKeyboard } from '../../../hocs/keyboard';

type Props = { children?: ReactNode };

const Controller: FC<Props> = ({ children }) => {
  const startPos: Position = useMemo(() => {
    return [...store.player.character.position];
  }, []);

  const ref = useRef<Group>(null);
  const firstRender = useRef(true);

  const [enabledOrbitControls, setEnabledOrbitControls] =
    useState<boolean>(true);

  const [_, get] = useKeyboard();

  // Store the last sent position/rotation to avoid redundant emits

  useFrame(({ camera }) => {
    if (!ref.current) return;

    const speed = 5; // Movement speed
    const rotationSpeed = Math.PI * 0.5; // Rotation speed (radians per second)
    const delta = 1 / 60; // Approximate frame delta for consistent behavior

    let hasMoved = false; // Track if the character has moved

    let anim: CommonAnimationNames = 'idle';

    // Forward movement (W key)
    if (get().forward) {
      ref.current.position.z -=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.x -=
        Math.sin(ref.current.rotation.y) * speed * delta;
      hasMoved = true;
      anim = 'run';
    }

    // Backward movement
    if (get().back) {
      ref.current.position.z +=
        Math.cos(ref.current.rotation.y) * speed * delta;
      ref.current.position.x +=
        Math.sin(ref.current.rotation.y) * speed * delta;
      hasMoved = true;
      anim = 'run_back';
    }

    store.player.setAnim(anim);

    // Rotate left
    if (get().left) {
      ref.current.rotation.y += rotationSpeed * delta;
      hasMoved = true;
    }

    // Rotate right
    if (get().right) {
      ref.current.rotation.y -= rotationSpeed * delta;
      hasMoved = true;
    }

    setEnabledOrbitControls(!hasMoved);

    if (hasMoved) {
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

      if (positionChanged || rotationChanged) {
        store.player.moveTo(newPos, newRotate, anim);
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
    <>
      <OrbitControls
        position={store.player.character.position}
        enabled={enabledOrbitControls}
      />
      <group ref={ref} position={startPos}>
        {children}
      </group>
    </>
  );
};

export default Controller;
