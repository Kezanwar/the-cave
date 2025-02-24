import React from 'react';

export const Divider: React.FC = () => {
  return <div className="w-full h-[1px] bg-stone-200 dark:bg-stone-700" />;
};

export const OrDivider: React.FC = () => {
  return (
    <div className="relative flex items-center w-[60%]">
      <div className="flex-grow h-[1px] bg-stone-200 dark:bg-stone-700" />
      <span className="px-3 text-stone-500 dark:text-stone-400 text-sm">
        or
      </span>
      <div className="flex-grow h-[1px] bg-stone-200 dark:bg-stone-700" />
    </div>
  );
};
