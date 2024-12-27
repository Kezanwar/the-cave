import React, { FC, useEffect, useRef } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { GroupProps, Vector3 } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Group } from 'three';
import { useControls } from 'leva';

type Props = GroupProps & {
  model: string; // URL or path to the GLTF model
};

const RenderModel: FC<Props> = ({ model, ...props }) => {
  const { scene, animations } = useGLTF(model);
  const group = useRef<Group>(null);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isObject3D) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (actions && animations.length > 0) {
      actions[animations[0].name]?.play();
    }
  }, [actions]);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <primitive object={scene} {...props} ref={group} />
    </RigidBody>
  );
};

type MapType = {
  scale: number;
  position: Vector3;
};

type Maps = {
  [key: string]: MapType;
};

const maps: Maps = {
  castle_on_hills: {
    scale: 3,
    position: [-6, -7, 0]
  },
  animal_crossing_map: {
    scale: 20,
    position: [-15, -1, 10]
  },
  city_scene_tokyo: {
    scale: 0.72,
    position: [0, -1, -3.5]
  },
  de_dust_2_with_real_light: {
    scale: 0.3,
    position: [-5, -3, 13]
  },
  medieval_fantasy_book: {
    scale: 0.4,
    position: [-4, 0, -6]
  },
  battle_guys: {
    scale: 0.1,
    position: [-15, -1, 0]
  }
};

const Map = () => {
  const { map } = useControls('Map', {
    map: {
      value: 'city_scene_tokyo',
      options: Object.keys(maps)
    }
  });

  return (
    <RenderModel
      scale={maps[map].scale}
      position={maps[map].position}
      model={`models/${map}.glb`}
    />
  );
};

export default Map;
