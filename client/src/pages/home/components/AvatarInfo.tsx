import CharacterPreview from '@app/components/3d/character-preview/CharacterPreview';
import Heading from '@app/components/web/typography/heading';
import Subheading from '@app/components/web/typography/sub-heading';
import Tooltip from '@app/components/web/typography/tooltip';
import { Button } from '@app/components/web/ui/button';
import { Card } from '@app/components/web/ui/card';
import { LuPen } from 'react-icons/lu';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

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
