import { FC, useEffect } from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

const useApplyDarkMode = () => {
  useEffect(() => {
    document.body.classList.add('dark');
    return () => {
      document.body.classList.remove('dark');
    };
  }, []);
};

const DarkPageRoot: FC<Props> = ({ children, className }) => {
  useApplyDarkMode();
  return (
    <div className={`p-8 bg-black min-h-[100vh] w-[100vw] ${className || ''}`}>
      {children}
    </div>
  );
};

export default DarkPageRoot;
