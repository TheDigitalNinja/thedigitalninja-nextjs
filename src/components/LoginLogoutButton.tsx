/**
 * @file src/components/LoginLogoutButton.tsx
 * @fileoverview Login/Logout button component for The Digital Ninja website
 * @description This component displays either a login or logout button based on the user's
 *              authentication status. It includes user profile picture display for logged-in users.
 * 
 * @component LoginLogoutButton
 * @returns {JSX.Element} The rendered login/logout button
 */

'use client';

import { useAuth } from '../hooks/useAuth';
import Link from 'next/link';
import { UserIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export function LoginLogoutButton() {
  const { user, signOutUser } = useAuth();

  if (user) {
    return (
      <button 
        onClick={signOutUser}
        className="flex items-center space-x-2 text-gray-800 hover:underline"
      >
        {user.photoURL ? (
          <Image 
            src={user.photoURL} 
            alt="Profile" 
            width={24} 
            height={24} 
            className="rounded-full"
          />
        ) : (
          <UserIcon className="h-6 w-6" />
        )}
        <span>Logout</span>
      </button>
    );
  } else {
    return (
      <Link href="/login" className="flex items-center space-x-2 text-gray-800 hover:underline">
        <UserIcon className="h-6 w-6" />
        <span>Login</span>
      </Link>
    );
  }
}