import React, { ReactNode } from 'react';

const variants = {
  primary: 'text-primary',
  secondary: 'text-secondary'
};

type Props = {
  className?: string;
  children: ReactNode;
  variant: keyof typeof variants;
};

const BodyText: React.FC<Props> = ({ className, children, variant }) => {
  return (
    <p
      className={`${variants[variant]} text-sm   leading-5 ${className || ''}`}
    >
      {children}
    </p>
  );
};

export default BodyText;
