import React, { ReactNode, CSSProperties } from 'react';

interface SubtitleProps {
  children: ReactNode;
  style?: CSSProperties;
}

const Subtitle: React.FC<SubtitleProps> = ({ children, style }) => (
  <p className="text-gray-600 font-karla tracking-tight" style={{ fontSize: 15, color: 'grey', ...style }}>
    {children}
  </p>
);

export default Subtitle;
