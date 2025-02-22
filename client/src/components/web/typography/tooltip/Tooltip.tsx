import {
  TooltipProvider,
  Tooltip as ShadToolTip,
  TooltipTrigger,
  TooltipContent
} from '@app/components/web/ui/tooltip';
import { FC, ReactNode } from 'react';

type Props = { children: ReactNode; content: string };

const Tooltip: FC<Props> = ({ children, content }) => {
  return (
    <TooltipProvider>
      <ShadToolTip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </ShadToolTip>
    </TooltipProvider>
  );
};

export default Tooltip;
