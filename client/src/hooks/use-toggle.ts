import { useState } from 'react';

const useToggle = (): [boolean, () => void, () => void] => {
  const [value, setValue] = useState<boolean>(false);

  const open = (): void => {
    setValue(true);
  };

  const close = (): void => {
    setValue(false);
  };

  return [value, open, close];
};

export default useToggle;
