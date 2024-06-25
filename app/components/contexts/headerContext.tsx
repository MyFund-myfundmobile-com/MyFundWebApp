"use client";
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Create a context
const HeaderContext = createContext<{ title: string; setTitle: (title: string) => void } | undefined>(undefined);

// Create a provider component
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('DASHBOARD');
  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      {children}
    </HeaderContext.Provider>
  );
};

// Custom hook for using the header context
export const useHeader = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  return context;
};
