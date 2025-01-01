import { FC, ReactNode, useEffect, useMemo, useRef } from 'react';
import { CommonAnimationNames } from '@app/animations';
import { Controls } from '@app/hocs/keyboard';
import store from '@app/store';
import { Position } from '@app/store/game';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import { RigidBody, RapierRigidBody } from '@react-three/rapier';
import { Group, Vector3, Quaternion, Euler } from 'three';

const speed = 3; // Movement speed
const rotationSpeed = Math.PI * 0.5; // Rotation speed (radians per second)
const delta = 1 / 60; // Approximate frame delta for consistent behavior

type Props = { children?: ReactNode };

const ThirdPersonRapierController: FC<Props> = ({ children }) => {
  const startPos: Position = useMemo(() => {
    return [...store.player.character.position];
  }, []);

  const rbRef = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);

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

  useFrame(({ camera }) => {
    if (!rbRef.current || !container.current) return;

    const rb = rbRef.current;
    const movement = { x: 0, z: 0 };
    const controls = get();

    let anim: CommonAnimationNames = 'idle';
    let hasMoved = false;

    const rotationQuaternion = new Quaternion().setFromEuler(
      new Euler(0, rb.rotation().y, 0)
    );

    // Handle forward movement
    if (controls.forward) {
      movement.z -= 1;
      anim = 'run';
      hasMoved = true;
    }

    // Handle backward movement
    if (controls.back) {
      movement.z += 1;
      anim = 'run_back';
      hasMoved = true;
    }

    // Handle strafing left/right
    if (controls.left && !controls.forward && !controls.back) {
      movement.x -= 1;
      anim = 'run_left';
      hasMoved = true;
    }

    if (controls.right && !controls.forward && !controls.back) {
      movement.x += 1;
      anim = 'run_right';
      hasMoved = true;
    }

    // Handle rotation
    if (controls.rotate_left) {
      const newRotation = rb.rotation().y + rotationSpeed * delta;
      rb.setRotation({ x: 0, y: newRotation, z: 0, w: 1 }, true);
      hasMoved = true;
    }

    if (controls.rotate_right) {
      const newRotation = rb.rotation().y - rotationSpeed * delta;
      rb.setRotation({ x: 0, y: newRotation, z: 0, w: 1 }, true);
      hasMoved = true;
    }

    // Calculate velocity
    if (hasMoved) {
      const movementVector = new Vector3(movement.x, 0, movement.z);
      movementVector.applyQuaternion(rotationQuaternion).normalize();
      movementVector.multiplyScalar(speed);

      rb.setLinvel({ x: movementVector.x, y: 0, z: movementVector.z }, true);

      // Emit position/rotation
      const newPos = rb.translation();
      store.player.moveTo(
        [newPos.x, newPos.y, newPos.z],
        rb.rotation().y,
        anim,
        true
      );
    }

    // CAMERA
    const offset = new Vector3(0, 3, 3); // Camera offset relative to character
    const lookOffset = new Vector3(0, 0, -3);

    const characterPosition = new Vector3(
      rb.translation().x,
      rb.translation().y,
      rb.translation().z
    );

    const offsetPosition = characterPosition.clone().add(offset);
    const offsetLookAt = characterPosition.clone().add(lookOffset);

    camera.position.lerp(offsetPosition, 0.1); // Smooth transition to new position
    camera.lookAt(offsetLookAt);
  });

  return (
    <RigidBody
      ref={rbRef}
      colliders={false}
      position={startPos}
      type="dynamic"
      lockRotations
    >
      <group ref={container}>{children}</group>
    </RigidBody>
  );
};

export default ThirdPersonRapierController;
