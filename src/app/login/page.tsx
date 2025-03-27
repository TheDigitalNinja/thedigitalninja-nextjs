/**
 * @file src/app/login/page.tsx
 * @fileoverview Login page component for The Digital Ninja website
 * @description This file contains the layout and functionality for the login page,
 *              including Google sign-in and redirection logic.
 * 
 * @component LoginPage
 * @returns {JSX.Element} The rendered login page
 */

'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from 'next/image';
import Header from "../../components/Header";

export default function LoginPage() {
  const { user, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/'); // Redirect to home page if user is already logged in
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="Login" useH1={false}/>
      <main className="flex-grow flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="p-8 max-w-sm w-full bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mb-6">
            Login to TheDigital.Ninja
          </h1>
          <div className="flex justify-center">
            <button
              onClick={signIn}
              className="px-4 py-2 border flex items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white hover:shadow transition duration-150 bg-white dark:bg-gray-700"
            >
              <Image
                className="w-6 h-6"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                width={24}
                height={24}
                alt="google logo"
              />
              <span>Login with Google</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}