import React from 'react';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { LoginLogoutButton } from './LoginLogoutButton';
import Socials from './Socials';
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
          <DialogPanel className="fixed inset-y-0 left-0 w-64 bg-gray-100 dark:bg-gray-800 shadow-xl flex flex-col overflow-y-auto">
            <div className="p-6 flex-grow">
              <nav className="mb-8">
                <ul className="space-y-2">

                  {['Home', 'Blog', 'About'].map((item) => (
                    <li key={item}>
                      <Link 
                        href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                        className="block py-2 px-4 text-lg text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-200"
                        onClick={onClose}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                  
                </ul>
              </nav>
            </div>

            <Socials />

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 p-6">
              <LoginLogoutButton />
            </div>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
};

export default SidebarMobile;