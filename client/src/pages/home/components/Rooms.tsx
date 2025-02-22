import { getRoomMeta, RoomsMetaResponse } from '@app/api/rooms';
import OnlineStatus from '@app/components/web/online-status';
import { BodyText } from '@app/components/web/typography/body-text';
import Subheading from '@app/components/web/typography/sub-heading';
import Tooltip from '@app/components/web/typography/tooltip';
import { Button } from '@app/components/web/ui/button';
import { Spinner } from '@app/components/web/ui/spinner';
import useQuery, {
  POLLING_INTERVALS,
  useQueryProps
} from '@app/hooks/use-query';
import { FC } from 'react';
import { LuChevronRight } from 'react-icons/lu';
import { useNavigate } from 'react-router';

const roomsMetaQueryConfig: useQueryProps<RoomsMetaResponse> = {
  fetchFn: getRoomMeta,
  pollingInterval: POLLING_INTERVALS.TEN_SECONDS
};

const Rooms: FC = () => {
  const { response, error, loading } = useQuery(roomsMetaQueryConfig);

  return (
    <>
      <Room
        isLoading={loading}
        name="Lobby"
        playersOnline={response?.lobby}
        to="/lobby"
      />
    </>
  );
};

export default Rooms;

type RoomProps = {
  name: string;
  playersOnline: number | undefined;
  to: string;
  isLoading: boolean;
};

const Room: FC<RoomProps> = ({ name, playersOnline, to, isLoading }) => {
  const nav = useNavigate();
  return (
    <div className="border border-neutral-800 p-4 rounded-md flex items-center gap-6">
      <Subheading size="sm" variant="primary">
        {name}
      </Subheading>
      {isLoading ? (
        <Spinner show size={'small'} />
      ) : (
        <div className="flex items-center gap-1">
          <OnlineStatus isOnline />
          <BodyText variant="secondary">{playersOnline} Online</BodyText>
        </div>
      )}

      <Tooltip content={`Join ${name}`}>
        <Button
          onClick={() => nav(to)}
          className="text-orange-500"
          variant="outline"
          size={'icon'}
        >
          <LuChevronRight />
        </Button>
      </Tooltip>
    </div>
  );
};
