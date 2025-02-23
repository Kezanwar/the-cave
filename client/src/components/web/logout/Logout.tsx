import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import Tooltip from '@app/components/web/typography/tooltip';
import { Button } from '../ui/button';

import { IoLogOutOutline } from 'react-icons/io5';

const Logout: FC = observer(() => {
  return (
    <Tooltip content="Logout">
      <Button className="text-orange-500" variant={'icon'} size="icon">
        <IoLogOutOutline size={16} />
      </Button>
    </Tooltip>
  );
});

export default Logout;
