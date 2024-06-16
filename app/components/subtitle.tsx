import React, { ReactNode, CSSProperties } from 'react';

interface SubtitleProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string; // Add className to the props
}

const Subtitle: React.FC<SubtitleProps> = ({ children, style, className }) => (
  <p className={`text-gray-600 font-karla tracking-tight ${className}`} style={{ fontSize: 15, color: 'grey', ...style }}>
    {children}
  </p>
);

export default Subtitle;
