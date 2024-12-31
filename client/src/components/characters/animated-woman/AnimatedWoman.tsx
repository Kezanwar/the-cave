/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/Animated Woman.glb -o src/components/characters/animated-woman/AnimatedWoman.tsx -r public 
*/

import * as THREE from 'three';
import React, { FC, useEffect } from 'react';
import { Euler, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { GLTF, SkeletonUtils } from 'three-stdlib';

import { observer } from 'mobx-react-lite';

import { CommonAnimationNames } from '@app/animations';
import store from '@app/store';

export type ActionName =
  | 'CharacterArmature|Death'
  | 'CharacterArmature|Gun_Shoot'
  | 'CharacterArmature|HitRecieve'
  | 'CharacterArmature|HitRecieve_2'
  | 'CharacterArmature|Idle'
  | 'CharacterArmature|Idle_Gun'
  | 'CharacterArmature|Idle_Gun_Pointing'
  | 'CharacterArmature|Idle_Gun_Shoot'
  | 'CharacterArmature|Idle_Neutral'
  | 'CharacterArmature|Idle_Sword'
  | 'CharacterArmature|Interact'
  | 'CharacterArmature|Kick_Left'
  | 'CharacterArmature|Kick_Right'
  | 'CharacterArmature|Punch_Left'
  | 'CharacterArmature|Punch_Right'
  | 'CharacterArmature|Roll'
  | 'CharacterArmature|Run'
  | 'CharacterArmature|Run_Back'
  | 'CharacterArmature|Run_Left'
  | 'CharacterArmature|Run_Right'
  | 'CharacterArmature|Run_Shoot'
  | 'CharacterArmature|Sword_Slash'
  | 'CharacterArmature|Walk'
  | 'CharacterArmature|Wave';

// Map common animations to specific action names
const commonAnimMap: CommonAnimMap = {
  run: 'CharacterArmature|Run',
  run_back: 'CharacterArmature|Run_Back',
  run_right: 'CharacterArmature|Run_Right',
  run_left: 'CharacterArmature|Run_Left',
  idle: 'CharacterArmature|Idle',
  walk: 'CharacterArmature|Walk',
  jump: 'CharacterArmature|Roll', // Example: use "Roll" for "jump"
  wave: 'CharacterArmature|Wave'
};

const animLoop = (anim: CommonAnimationNames) => {
  switch (anim) {
    case 'idle':
    case 'run':
    case 'run_back':
    case 'run_left':
    case 'run_right':
      return THREE.LoopRepeat;
    default:
      return THREE.LoopOnce;
  }
};

type CommonAnimMap = {
  [key in CommonAnimationNames]: ActionName;
};

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    Casual_Body_1: THREE.SkinnedMesh;
    Casual_Body_2: THREE.SkinnedMesh;
    Casual_Feet_1: THREE.SkinnedMesh;
    Casual_Feet_2: THREE.SkinnedMesh;
    Casual_Head_1: THREE.SkinnedMesh;
    Casual_Head_2: THREE.SkinnedMesh;
    Casual_Head_3: THREE.SkinnedMesh;
    Casual_Head_4: THREE.SkinnedMesh;
    Casual_Legs: THREE.SkinnedMesh;
    Root: THREE.Bone;
  };
  materials: {
    White: THREE.MeshStandardMaterial;
    Skin: THREE.MeshStandardMaterial;
    Grey: THREE.MeshStandardMaterial;
    Hair_Blond: THREE.MeshStandardMaterial;
    Hair_Brown: THREE.MeshStandardMaterial;
    Brown: THREE.MeshStandardMaterial;
    Orange: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

type Props = {
  hairColor: string;
  topColor: string;
  bottomColor: string;
  anim?: CommonAnimationNames;
  isPlayer: boolean;
};

const rotations: Euler = [-Math.PI / 2, 0, 0];

const charRotate: Euler = [0, Math.PI, 0];
const scale = 100;

const AnimatedWoman: FC<Props> = observer(
  ({
    hairColor = 'maroon',
    topColor = 'green',
    bottomColor = 'purple',
    anim,
    isPlayer
    // position
  }) => {
    const group = React.useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF('/models/Animated Woman.glb');
    const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
    const { nodes, materials } = useGraph(clone) as GLTFResult;
    const { actions, mixer } = useAnimations(animations, group);

    useEffect(() => {
      function fn() {
        store.player.onStaticAnimationEnd();
      }
      if (isPlayer) {
        mixer.addEventListener('finished', fn);
      }

      return () => {
        if (isPlayer) {
          mixer.removeEventListener('finished', fn);
        }
      };
    }, []);

    useEffect(() => {
      if (anim) {
        actions[commonAnimMap[anim]]
          ?.reset()
          .fadeIn(0.2)
          .setDuration(0.75)
          .setLoop(animLoop(anim), Infinity)
          .play();
      }
      return () => {
        if (anim) {
          actions[commonAnimMap[anim]]?.fadeOut(0.2);
        }
      };
    }, [anim]);

    return (
      // <RigidBody colliders={'trimesh'} lockRotations>
      <group
        castShadow
        ref={group}
        scale={1}
        rotation={charRotate}
        dispose={null}
      >
        <group name="Root_Scene">
          <group name="RootNode">
            <group name="CharacterArmature" rotation={rotations} scale={scale}>
              <primitive object={nodes.Root} />
            </group>
            <group name="Casual_Body" rotation={rotations} scale={scale}>
              <skinnedMesh
                name="Casual_Body_1"
                geometry={nodes.Casual_Body_1.geometry}
                material={materials.White}
                skeleton={nodes.Casual_Body_1.skeleton}
              >
                <meshStandardMaterial color={topColor} />
              </skinnedMesh>
              <skinnedMesh
                name="Casual_Body_2"
                geometry={nodes.Casual_Body_2.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Body_2.skeleton}
              />
            </group>
            <group name="Casual_Feet" rotation={rotations} scale={scale}>
              <skinnedMesh
                name="Casual_Feet_1"
                geometry={nodes.Casual_Feet_1.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Feet_1.skeleton}
              />
              <skinnedMesh
                name="Casual_Feet_2"
                geometry={nodes.Casual_Feet_2.geometry}
                material={materials.Grey}
                skeleton={nodes.Casual_Feet_2.skeleton}
              />
            </group>
            <group name="Casual_Head" rotation={rotations} scale={scale}>
              <skinnedMesh
                name="Casual_Head_1"
                geometry={nodes.Casual_Head_1.geometry}
                material={materials.Skin}
                skeleton={nodes.Casual_Head_1.skeleton}
              />
              <skinnedMesh
                name="Casual_Head_2"
                geometry={nodes.Casual_Head_2.geometry}
                material={materials.Hair_Blond}
                skeleton={nodes.Casual_Head_2.skeleton}
              >
                <meshStandardMaterial color={hairColor} />
              </skinnedMesh>
              <skinnedMesh
                name="Casual_Head_3"
                geometry={nodes.Casual_Head_3.geometry}
                material={materials.Hair_Brown}
                skeleton={nodes.Casual_Head_3.skeleton}
              />
              <skinnedMesh
                name="Casual_Head_4"
                geometry={nodes.Casual_Head_4.geometry}
                material={materials.Brown}
                skeleton={nodes.Casual_Head_4.skeleton}
              />
            </group>
            <skinnedMesh
              name="Casual_Legs"
              geometry={nodes.Casual_Legs.geometry}
              material={materials.Orange}
              skeleton={nodes.Casual_Legs.skeleton}
              rotation={rotations}
              scale={scale}
            >
              <meshStandardMaterial color={bottomColor} />
            </skinnedMesh>
          </group>
        </group>
      </group>
      // </RigidBody>
    );
  }
);

useGLTF.preload('/models/Animated Woman.glb');

export default AnimatedWoman;
