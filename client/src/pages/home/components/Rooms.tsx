import { getRoomMeta, RoomsMetaResponse } from '@app/api/rooms';
import OnlineStatus from '@app/components/web/online-status';
import Heading from '@app/components/web/typography/heading';
import Subheading from '@app/components/web/typography/sub-heading';
import Tooltip from '@app/components/web/typography/tooltip';
import { Button } from '@app/components/web/ui/button';
import { Card } from '@app/components/web/ui/card';
import { Spinner } from '@app/components/web/ui/spinner';
import { toast } from 'sonner';
import useQuery, {
  POLLING_INTERVALS,
  useQueryProps
} from '@app/hooks/use-query';
import store from '@app/store';
import { observer } from 'mobx-react-lite';
import { FC } from 'react';
import { LuChevronRight, LuInfo, LuX } from 'react-icons/lu';
import { useNavigate } from 'react-router';
import { IoTimeOutline } from 'react-icons/io5';

const roomsMetaQueryConfig: useQueryProps<RoomsMetaResponse> = {
  fetchFn: getRoomMeta,
  pollingInterval: POLLING_INTERVALS.TEN_SECONDS
};

const Rooms: FC = () => {
  const { response, error, loading } = useQuery(roomsMetaQueryConfig);

  return (
    <Card className="py-6 flex flex-col ">
      {/* <Heading variant="primary" size="md" className="text-center">
        Rooms
      </Heading> */}
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <Subheading variant="primary" size="md" className="text-center mb-4">
          Game Rooms
        </Subheading>
        <Room
          isLoading={loading}
          name="The Lobby"
          playersOnline={response?.lobby}
          to="/lobby"
        />
        <Room
          comingSoon={true}
          isLoading={loading}
          name="Marie Franc"
          playersOnline={0}
          to="/race-track"
        />
        <Room
          comingSoon={true}
          isLoading={loading}
          name="The Race Track"
          playersOnline={0}
          to="/race-track"
        />
      </div>
    </Card>
  );
};

export default Rooms;

type RoomProps = {
  name: string;
  playersOnline: number | undefined;
  to: string;
  isLoading: boolean;
  comingSoon?: boolean;
};

const Room: FC<RoomProps> = observer(
  ({ name, playersOnline, to, isLoading, comingSoon }) => {
    const nav = useNavigate();
    const hasAvatar = !!store.auth.avatar;
    const onClick = () => {
      if (comingSoon) {
        return;
      }
      if (!hasAvatar) {
        toast(`Unable To Join ${name}`, {
          dismissible: true,
          position: 'bottom-left',
          icon: <LuInfo className="text-red-500" />,
          description: 'You must create an Avatar First',
          action: {
            label: 'Create Avatar',
            onClick: () => console.log('Undo')
          }
        });
        return;
      }
      nav(to);
    };
    return (
      <div className="relative w-[320px] justify-between border border-neutral-800 p-4 rounded-md flex items-center gap-6">
        <div className="w-[110px]">
          <Subheading className="w-[110px]" size="md" variant="primary">
            {name}
          </Subheading>
          {/* {comingSoon && (
            <Subheading className="w-[110px]" size="sm" variant="primary">
              (Coming Soon)
            </Subheading>
          )} */}
        </div>

        <div className="flex w-[100px] items-center gap-1">
          {isLoading ? (
            <Spinner show size={'small'} />
          ) : (
            <>
              <OnlineStatus isOnline={!comingSoon} />
              <Subheading size="sm" variant="secondary">
                {!comingSoon ? `${playersOnline} Online` : 'Offline'}
              </Subheading>
            </>
          )}
        </div>

        <Tooltip content={comingSoon ? 'Offline' : `Join ${name}`}>
          <Button
            disabled={isLoading}
            onClick={onClick}
            className={comingSoon ? 'text-red-500' : 'text-orange-500'}
            variant={'icon'}
            size={'icon'}
          >
            {comingSoon ? <LuX /> : <LuChevronRight />}
          </Button>
        </Tooltip>
        {comingSoon && <OfflineOverlay comingSoon={comingSoon} />}
      </div>
    );
  }
);

type OfflineOverlayProps = {
  comingSoon?: boolean;
};

const OfflineOverlay: FC<OfflineOverlayProps> = ({ comingSoon }) => {
  return (
    <div className="absolute top-0 left-0 h-full rounded-md w-full bg-neutral-950/60">
      {comingSoon && (
        <div className="h-full w-full relative">
          <div className="absolute -right-28 top-1/2 -translate-y-1/2">
            <Subheading
              variant="secondary"
              className="flex items-center gap-1"
              size="sm"
            >
              <IoTimeOutline /> Coming Soon
            </Subheading>
          </div>
        </div>
      )}
    </div>
  );
};
