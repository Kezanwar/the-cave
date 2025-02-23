import { FC } from 'react';
import Logo from '../logo';

const LoadingScreen: FC = () => {
  return (
    <div className="bg-black h-[100vh] w-[100vw] flex items-center justify-center">
      <div>
        <Logo loading={true} />
      </div>
    </div>
  );
};

export default LoadingScreen;
