import React, { ReactNode } from 'react';

const sizes = {
  md: 'font-semi-bold text-2xl  md:text-3xl',
  sm: 'font-semi-bold text-md  md:text-lg',
  lg: 'font-semi-bold tracking-tighter text-2xl md:text-4xl'
};

const variants = {
  primary: 'text-primary',
  secondary: 'text-secondary'
};

type Props = {
  size: keyof typeof sizes;
  variant: keyof typeof variants;
  className?: string;
  children: ReactNode;
};

const Heading: React.FC<Props> = ({
  size = 'md',
  variant,
  className = '',
  children
}) => {
  return (
    <h2 className={`${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;
