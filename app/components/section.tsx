import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ children }) => (
  <h2 className="font-nexa text-gray-600 tracking-wide" style={{ letterSpacing: '0.1em', marginTop: 25, fontSize: 13, color: 'grey' }}>
    {children}
  </h2>
);

export default Section;
