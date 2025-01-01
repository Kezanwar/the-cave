import { FC, memo } from 'react';

import { Billboard, Text } from '@react-three/drei';

import { Position } from '@app/store/game';

type Props = {
  name: string;
};

const pos: Position = [0, 2, 0];

const Nameplate: FC<Props> = memo(({ name }) => {
  return (
    <Billboard position={pos}>
      <Text color={'black'} fontSize={0.15}>
        {name}
      </Text>
    </Billboard>
  );
});

export default Nameplate;
