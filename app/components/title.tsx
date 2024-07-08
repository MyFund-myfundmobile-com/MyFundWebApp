"use client";
import React, { ReactNode, CSSProperties } from 'react';

interface TitleProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string; // Add className to the props
}

const Title: React.FC<TitleProps> = ({ children, style, className }) => (
  <h1 className={`text-5xl mb-1 mt-6 tracking-tighter font-proxima font-bold text-purple1 ${className}`} style={style}>
    {children}
  </h1>
);

export default Title;
