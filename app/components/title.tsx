import React, { ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => (
  <h1 className="text-5xl mb-1 mt-6 tracking-tighter font-proxima font-bold text-purple1">
    {children}
  </h1>
);

export default Title;
