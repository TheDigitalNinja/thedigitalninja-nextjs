'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bars3Icon } from '@heroicons/react/24/outline';

const SidebarControls: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
      >
       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default SidebarControls;