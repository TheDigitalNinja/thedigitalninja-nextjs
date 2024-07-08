'use client';

import { useAuth } from '../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
    <>
      <Header title="Login" useH1={false}/>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="p-6 max-w-sm w-full bg-white dark:bg-gray-800 shadow-md rounded-md">
            <h1 className="text-2xl font-semibold text-center text-gray-700 dark:text-gray-200 mt-8 mb-6">
              Login to TheDigital.Ninja
            </h1>
            <div className="flex justify-center">
              <button
                onClick={signIn}
                className="px-4 py-2 border flex items-center gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-white hover:shadow transition duration-150 bg-white dark:bg-gray-700"
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
            </div>
        </div>
      </div>
    </>
  );
}