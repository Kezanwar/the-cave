import CharacterPreview from '@app/components/character-preview/CharacterPreview';
import Heading from '@app/components/typography/heading';
import Subheading from '@app/components/typography/sub-heading';
import Tooltip from '@app/components/typography/tooltip';
import { Button } from '@app/components/ui/button';
import { Card } from '@app/components/ui/card';
import { LuPen } from 'react-icons/lu';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

const ControlBar: FC = observer(() => {
  return (
    <Card className="p-6">
      <div className="flex h-full justify-between items-center">
        <div>
          <Subheading variant="secondary" size="md">
            Your Avatar
          </Subheading>
          <Heading variant="primary" size="sm">
            No Name
          </Heading>
        </div>
        <div className="flex gap-2">
          <Tooltip content="Edit Avatar">
            <Button className="text-orange-500" variant="outline" size="icon">
              <LuPen />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
});

const AvatarInfo: FC = observer(() => {
  return (
    <div className="flex flex-col">
      <div className="flex-1">
        <CharacterPreview />
      </div>
      <ControlBar />
    </div>
  );
});

export default AvatarInfo;
