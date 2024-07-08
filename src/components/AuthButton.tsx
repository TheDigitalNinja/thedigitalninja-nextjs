'use client';

import { useAuth } from '../hooks/useAuth';

export function AuthButton() {
  const { user, signIn, signOutUser } = useAuth();

  return (
    <div>
      {user ? (
        <div>
          <span>Welcome, {user.displayName}</span>
          <button 
            onClick={signOutUser}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button 
          onClick={signIn}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
}