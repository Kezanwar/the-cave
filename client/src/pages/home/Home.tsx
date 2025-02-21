import store, { observer } from '@app/store';
import { FC } from 'react';
import SignIn from '../sign-in';
import DarkPageRoot from '@app/components/containers/dark-page-root';
import { Card } from '@app/components/ui/card';
import CharacterPreview from '@app/components/character-preview/CharacterPreview';
import Header from './components/Header';
import Heading from '@app/components/typography/heading';
import { Button } from '@app/components/ui/button';
import { LuChevronRight } from 'react-icons/lu';

const HomePage: FC = observer(() => {
  if (!store.auth.isAuthenticated) {
    return <SignIn />;
  }
  return (
    <DarkPageRoot className="flex gap-8 flex-col h-[100vh] max-h-[100vh]">
      <Header />
      <div className="flex-1 grid grid-cols-[1fr_33.33%] grid-rows-1 gap-8">
        <Card></Card>
        <div className="flex flex-col">
          <div className="flex-1">
            <CharacterPreview />
          </div>
          <Card className="h-28 p-6">
            <Heading variant="sm">Avatar</Heading>
            <Button variant="outline" size="icon">
              <LuChevronRight />
            </Button>
          </Card>
        </div>
      </div>
    </DarkPageRoot>
  );
});

export default HomePage;
