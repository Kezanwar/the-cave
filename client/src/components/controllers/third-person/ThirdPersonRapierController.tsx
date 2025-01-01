import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import {
  CapsuleArgs,
  CapsuleCollider,
  RapierRigidBody,
  RigidBody
} from '@react-three/rapier';
import { ReactNode, useEffect, useRef } from 'react';
import { MathUtils, Vector3, Group } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Controls } from '@app/hocs/keyboard';
import store from '@app/store';
import { CommonAnimationNames } from '@app/animations';

type Movement = {
  x: number;
  z: number;
};

type Props = {
  children: ReactNode;
};

const colliderArgs: CapsuleArgs = [0.8, 0.25];

const ROTATION_SPEED = degToRad(1.2);
const RUN_SPEED = 8;

const ThirdPersonRapierController: React.FC<Props> = ({ children }) => {
  const rb = useRef<RapierRigidBody>(null);
  const container = useRef<Group>(null);
  const character = useRef<Group>(null);

  const rotationTarget = useRef<number>(0);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());
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
    if (rb.current) {
      const vel = rb.current.linvel();

      const movement: Movement = {
        x: 0,
        z: 0
      };

      const controls = get();

      let anim: CommonAnimationNames = 'idle';
      let hasMoved = false;

      // Rotate independently with Q/E
      if (controls.rotate_left) {
        rotationTarget.current += ROTATION_SPEED;
      }

      if (controls.rotate_right) {
        rotationTarget.current -= ROTATION_SPEED;
      }

      if (controls.forward) {
        movement.z = -1;
        hasMoved = true;
        anim = 'run';

        // Rotate if moving forward with A or D
        if (controls.left) {
          rotationTarget.current += ROTATION_SPEED;
        }
        if (controls.right) {
          rotationTarget.current -= ROTATION_SPEED;
        }
      }

      // Backward movement
      if (controls.back) {
        movement.z = 1;
        hasMoved = true;
        anim = 'run_back';

        // Rotate if moving backward with A or D
        if (controls.left) {
          rotationTarget.current += ROTATION_SPEED;
        }
        if (controls.right) {
          rotationTarget.current -= ROTATION_SPEED;
        }
      }

      // Strafe left (only A)
      if (controls.left && !controls.forward && !controls.back) {
        movement.x = -1;
        hasMoved = true;
        anim = 'run_left';
      }

      // Strafe right (only D)
      if (controls.right && !controls.forward && !controls.back) {
        movement.x = 1;
        hasMoved = true;
        anim = 'run_right';
      }

      const animChanged = anim !== store.player.character.anim;

      if (hasMoved || (animChanged && !store.player.isStaticAnim)) {
        const targetRotation = rotationTarget.current;

        vel.x =
          Math.sin(targetRotation + Math.atan2(movement.x, movement.z)) *
          RUN_SPEED;
        vel.z =
          Math.cos(targetRotation + Math.atan2(movement.x, movement.z)) *
          RUN_SPEED;

        rb.current.setLinvel(vel, true);

        const newPos = rb.current.translation();

        store.player.moveTo(
          [newPos.x, newPos.y, newPos.z],
          rb.current.rotation().y,
          anim,
          true
        );
      }
    }

    // CAMERA
    if (container.current) {
      container.current.rotation.y = MathUtils.lerp(
        container.current.rotation.y,
        rotationTarget.current,
        0.1
      );
    }

    if (cameraPosition.current) {
      cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
      camera.position.lerp(cameraWorldPosition.current, 0.1);
    }

    if (cameraTarget.current) {
      cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
      cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);

      camera.lookAt(cameraLookAt.current);
    }
  });

  return (
    <RigidBody colliders={false} lockRotations ref={rb}>
      <group ref={container}>
        <group ref={cameraTarget} position-z={-10} />
        <group ref={cameraPosition} position-y={1.5} position-z={3} />
        <group ref={character}>{children}</group>
      </group>
      <CapsuleCollider args={colliderArgs} />
    </RigidBody>
  );
};

export default ThirdPersonRapierController;
