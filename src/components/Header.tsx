import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import SidebarControls from "../components/SidebarControls";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-gray-800 text-white p-4 relative">
      <SidebarControls />
      <div className="container mx-auto text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </header>
  );
};

export default Header;