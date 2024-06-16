import React, { ReactNode, CSSProperties } from 'react';

interface SectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string; // Add className to the props
}

const Section: React.FC<SectionProps> = ({ children, style, className }) => (
  <h2 className={`font-nexa text-gray-600 tracking-wide ${className}`} style={{ letterSpacing: '0.1em', marginTop: 25, fontSize: 13, color: 'silver', ...style }}>
    {children}
  </h2>
);

export default Section;
