'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

const SidebarControls: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white md:hidden"
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className={`sidebar-overlay ${isSidebarOpen ? 'block' : 'hidden'} fixed inset-0 bg-black opacity-50 z-20 md:hidden`}></div>
      <aside className={`sidebar w-64 fixed left-0 top-0 bottom-0 bg-white shadow-md p-4 z-30 transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
        <Sidebar />
      </aside>
    </>
  );
};

export default SidebarControls;