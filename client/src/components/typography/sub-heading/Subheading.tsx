import React, { ReactNode } from 'react';

const sizes = {
  sm: 'text-[11px]',
  md: 'text-[13px]'
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

const Subheading: React.FC<Props> = ({ children, variant, size }) => {
  return (
    <h4
      className={`text-primary uppercase ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </h4>
  );
};

export default Subheading;
