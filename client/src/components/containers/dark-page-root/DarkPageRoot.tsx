import { FC } from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const DarkPageRoot: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`dark p-8 bg-black min-h-[100vh] w-[100vw] ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default DarkPageRoot;
