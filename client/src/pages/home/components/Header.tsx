import { Card } from '@app/components/web/ui/card';
import UserAvatar from '@app/components/web/user-avatar';

import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  return (
    <Card className="h-20 px-4 flex items-center justify-end">
      <UserAvatar />
    </Card>
  );
});

export default Header;
