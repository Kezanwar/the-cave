import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const DarkPageRoot: FC<Props> = ({ children }) => {
  return (
    <div className="dark bg-black min-h-[100vh] w-[100vw] ">{children}</div>
  );
};

export default DarkPageRoot;
