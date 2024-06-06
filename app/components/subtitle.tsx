import React, { ReactNode } from 'react';

interface SubtitleProps {
  children: ReactNode;
}

const Subtitle: React.FC<SubtitleProps> = ({ children }) => (
  <p className="text-gray-600 font-karla tracking-tight" style={{ fontSize: 15, color: 'grey' }}>
    {children}
  </p>
);

export default Subtitle;
