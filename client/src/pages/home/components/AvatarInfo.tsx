import { FC } from 'react';
import store, { observer } from '@app/store';
import { LuPen } from 'react-icons/lu';

import CharacterPreview from '@app/components/3d/character-preview/CharacterPreview';
import Heading from '@app/components/web/typography/heading';
import Subheading from '@app/components/web/typography/sub-heading';
import Tooltip from '@app/components/web/typography/tooltip';
import { Button } from '@app/components/web/ui/button';
import { Card } from '@app/components/web/ui/card';

import { BodyText } from '@app/components/web/typography/body-text';

const AvatarInfo: FC = observer(() => {
  const hasAvatar = !!store.auth.avatar;

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <CharacterPreview />
      </div>
      {hasAvatar ? <ControlBar /> : <NoAvatar />}
    </div>
  );
});

export default AvatarInfo;

const ControlBar: FC = observer(() => {
  return (
    <Card className="p-6">
      <div className="flex h-full justify-between items-center">
        <div>
          <Subheading variant="secondary" size="sm">
            Your Avatar
          </Subheading>
          <Heading variant="primary" size="sm">
            No Name
          </Heading>
        </div>
        <div className="flex gap-2">
          <Tooltip content="Edit Avatar">
            <Button className="text-orange-500" variant={'icon'} size="icon">
              <LuPen />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
});

const NoAvatar: FC = observer(() => {
  return (
    <Card className="p-6 flex justify-center flex-col items-center text-center gap-6">
      <BodyText variant="primary" className="max-w-[75%]">
        You haven't created an Avatar yet, you'll need to create one before
        joining a Game Room.
      </BodyText>
      <Tooltip content="Create an Avatar">
        <Button className="text-orange-500" variant={'icon'} size="icon">
          <LuPen />
        </Button>
      </Tooltip>
    </Card>
  );
});
