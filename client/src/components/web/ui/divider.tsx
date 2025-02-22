import React from 'react';

export const Divider: React.FC = () => {
  return <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />;
};

export const OrDivider: React.FC = () => {
  return (
    <div className="relative flex items-center w-[60%]">
      <div className="flex-grow h-[1px] bg-neutral-200 dark:bg-neutral-700" />
      <span className="px-3 text-neutral-500 dark:text-neutral-400 text-sm">
        or
      </span>
      <div className="flex-grow h-[1px] bg-neutral-200 dark:bg-neutral-700" />
    </div>
  );
};
