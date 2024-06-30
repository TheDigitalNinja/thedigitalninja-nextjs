import React from 'react';
import SidebarControls from './SidebarControls';

interface HeaderProps {
  title?: string;
  useH1?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, useH1 = true }) => {
  const TitleComponent = useH1 ? 'h1' : 'p';

  return (
    <header className="bg-gray-800 text-white p-4 relative">
      <div className="container mx-auto flex items-center justify-between">
        <SidebarControls />
        <TitleComponent className="text-2xl font-bold text-center flex-grow">{title}</TitleComponent>
        <div className="w-8"></div> {/* Empty div for spacing */}
      </div>
    </header>
  );
};

export default Header;