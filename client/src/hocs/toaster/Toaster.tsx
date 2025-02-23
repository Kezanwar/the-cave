import { Toaster as ShadToaster } from '@app/components/web/ui/sonner';
import { FC } from 'react';

const Toaster: FC = () => {
  return (
    <div className="dark">
      <ShadToaster />
    </div>
  );
};

export default Toaster;
