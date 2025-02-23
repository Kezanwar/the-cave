import store, { observer } from '@app/store';
import { FC } from 'react';
import SignIn from '../sign-in';
import DarkPageRoot from '@app/components/web/containers/dark-page-root';
import { Card } from '@app/components/web/ui/card';
import Header from './components/Header';
import AvatarInfo from './components/AvatarInfo';
import Rooms from './components/Rooms';

const HomePage: FC = observer(() => {
  if (!store.auth.isAuthenticated) {
    return <SignIn />;
  }
  return (
    <DarkPageRoot className="flex gap-4 flex-col h-[100vh] max-h-[100vh]">
      <Header />
      <div className="flex-1 grid grid-cols-[1fr_33.33%] grid-rows-1 gap-4">
        <Card className="flex justify-center items-center">
          <Rooms />
        </Card>
        <AvatarInfo />
      </div>
    </DarkPageRoot>
  );
});

export default HomePage;
