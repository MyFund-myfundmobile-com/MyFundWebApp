import React, { ReactNode, CSSProperties } from 'react';

interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Title: React.FC<TitleProps> = ({ children, style }) => (
  <h1 className="text-5xl mb-1 mt-6 tracking-tighter font-proxima font-bold text-purple1" style={style}>
    {children}
  </h1>
);

export default Title;
