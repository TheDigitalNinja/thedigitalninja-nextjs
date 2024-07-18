/**
 * @file src/components/SidebarControls.tsx
 * @fileoverview SidebarControls component for The Digital Ninja website
 * @description This component renders the sidebar toggle button for mobile views
 * 
 * @component SidebarControls
 * @returns {JSX.Element} The rendered sidebar controls
 */

'use client';

import React, { useState } from 'react';
import SidebarMobile from './SidebarMobile';
import { Bars3Icon } from '@heroicons/react/24/outline';

const SidebarControls: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden text-white" // Hide on md screens and up
        aria-label="Open sidebar"
      >
       <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <SidebarMobile isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default SidebarControls;