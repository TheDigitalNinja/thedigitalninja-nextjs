import React from 'react';
import SidebarControls from './SidebarControls';

interface HeaderProps {
    title?: string;
  }

  const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <SidebarControls />
        <h1 className="text-2xl font-bold text-center flex-grow">{title}</h1>
        <div className="w-8"></div> {/* Empty div for spacing */}
      </div>
    </header>
  );
};

export default Header;