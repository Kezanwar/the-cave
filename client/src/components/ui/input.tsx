import * as React from 'react';

import { cn } from '@app/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 dark:text-white focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            error
              ? 'border-red-700 focus-visible:ring-red-700 dark:border-red-500 dark:focus-visible:ring-red-500'
              : 'border-neutral-200 focus-visible:ring-neutral-950 dark:border-neutral-800 dark:focus-visible:ring-neutral-300',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm ml-1 text-red-700 dark:text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
