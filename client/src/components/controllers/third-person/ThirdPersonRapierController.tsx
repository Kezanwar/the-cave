import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { useKeyboardControls } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { Vector3, Group, Euler } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Controls } from '@app/hocs/keyboard';
import store from '@app/store';
import { CommonAnimationNames } from '@app/animations';
import { Position } from '@app/store/game';
import CharacterCapsule from '../colliders/CharacterCapsule';

type Movement = {
  x: number;
  z: number;
};

type InitialPosRotate = {
  position: Position;
  rotation: Euler;
};

type Props = {
  children: ReactNode;
};

const ROTATION_SPEED = degToRad(1.7);
const RUN_SPEED = 8;

const ThirdPersonRapierController: React.FC<Props> = ({ children }) => {
  const rb = useRef<RapierRigidBody>(null);

  const character = useRef<Group>(null);
  const cameraTarget = useRef<Group>(null);
  const cameraPosition = useRef<Group>(null);
  const cameraWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAtWorldPosition = useRef<Vector3>(new Vector3());
  const cameraLookAt = useRef<Vector3>(new Vector3());

  const [sub, get] = useKeyboardControls<Controls>();

  const initialPosAndRotate: InitialPosRotate = useMemo(() => {
    return {
      position: store.player.character.position,
      rotation: new Euler(0, store.player.character.rotate, 0)
    };
  }, []);

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
    if (rb.current && character.current) {
      const vel = rb.current.linvel();

      const movement: Movement = {
        x: 0,
        z: 0
      };

      const controls = get();

      let anim: CommonAnimationNames = 'idle';
      let hasMoved = false;
      let onlyRotate = false;

      // Rotate independently with Q/E
      // Handle rotation
      if (controls.rotate_left) {
        character.current.rotation.y += ROTATION_SPEED;
        onlyRotate = true;
      }

      // Rotate right
      if (controls.rotate_right) {
        character.current.rotation.y -= ROTATION_SPEED;
        onlyRotate = true;
      }

      if (controls.forward) {
        movement.z = -1;
        hasMoved = true;
        anim = 'run';

        // // Rotate if moving forward with A or D
        // Rotate left
        if (controls.left) {
          character.current.rotation.y += ROTATION_SPEED;
        }

        // Rotate right
        if (controls.right) {
          character.current.rotation.y -= ROTATION_SPEED;
        }
      }

      // Backward movement
      if (controls.back) {
        movement.z = 1;
        hasMoved = true;
        anim = 'run_back';

        if (controls.left) {
          character.current.rotation.y -= ROTATION_SPEED;
        }

        // Rotate right
        if (controls.right) {
          character.current.rotation.y += ROTATION_SPEED;
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

      const rotate = character.current.rotation.y;

      if (!hasMoved && onlyRotate) {
        const newPos = vec3(rb.current.translation());
        store.player.moveTo([newPos.x, newPos.y, newPos.z], rotate, anim, true);
      } else if (hasMoved || (animChanged && !store.player.isStaticAnim)) {
        // Calculate movement direction based on rotation
        const directionAngle = Math.atan2(movement.x, movement.z);
        const adjustedAngle = directionAngle + rotate;

        vel.x = Math.sin(adjustedAngle) * RUN_SPEED; // X velocity
        vel.z = Math.cos(adjustedAngle) * RUN_SPEED; // Z velocity

        rb.current.setLinvel(vel, true); // Apply velocity to RigidBody

        const newPos = vec3(rb.current.translation());

        store.player.moveTo([newPos.x, newPos.y, newPos.z], rotate, anim, true);
      }
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
    <RigidBody
      position={initialPosAndRotate.position}
      colliders={false}
      lockRotations
      ref={rb}
    >
      <group rotation={initialPosAndRotate.rotation} ref={character}>
        <group ref={cameraTarget} position-z={-20} />
        <group ref={cameraPosition} position-y={2.75} position-z={3} />

        {children}
      </group>
      <CharacterCapsule />
    </RigidBody>
  );
};

export default ThirdPersonRapierController;
