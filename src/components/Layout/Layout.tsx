import React from 'react';
import './layout.css';

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      {children}
    </div>
  );
}
