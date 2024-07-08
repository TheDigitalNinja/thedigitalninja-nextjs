/**
 * @file src/components/SidebarMobile.tsx
 * @fileoverview Mobile sidebar component for The Digital Ninja website
 * @description This file contains the mobile sidebar layout and functionality,
 *              including navigation links and the login/logout button.
 * 
 * @component SidebarMobile
 * @param {boolean} isOpen - Whether the sidebar is open
 * @param {() => void} onClose - Function to close the sidebar
 * @returns {JSX.Element} The rendered mobile sidebar
 */

'use client';

import React from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { LoginLogoutButton } from './LoginLogoutButton';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarMobile: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="relative z-50">
        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </TransitionChild>

        <TransitionChild
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 -translate-x-full"
          enterTo="opacity-100 translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-x-0"
          leaveTo="opacity-0 -translate-x-full"
        >
          <DialogPanel className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl flex flex-col">
            <div className="p-4 flex-grow">
              <p className="text-black font-bold mb-4">Menu</p>
              <nav className="space-y-2">
                <Link href="/" className="block text-gray-800 hover:underline">
                  Home
                </Link>
                <Link href="/blog" className="block text-gray-800 hover:underline">
                  Blog
                </Link>
                <Link href="/blog" className="block text-gray-800 hover:underline">
                  About
                </Link>
              </nav>
            </div>
            <div className="p-4 border-t">
              <LoginLogoutButton />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default SidebarMobile;