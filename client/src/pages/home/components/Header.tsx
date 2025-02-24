import Subheading from '@app/components/web/typography/sub-heading';
import { Card } from '@app/components/web/ui/card';
import UserAvatar from '@app/components/web/user-avatar';

import { observer } from 'mobx-react-lite';

const Header = observer(() => {
  return (
    <Card className="h-20 p-4 flex items-center justify-between">
      <Subheading size="md" variant="primary">
        The Cave
        <a
          className="text-neutral-500 block mt-1"
          href="https://github.com/Kezanwar"
          target="_blank"
        >
          BUILT BY{' '}
          <span className="underline dark:hover:text-neutral-100 transition-colors">
            Kez Anwar
          </span>
        </a>
      </Subheading>
      <UserAvatar />
    </Card>
  );
});

export default Header;
