/**
 * @file src/components/AuthProvider.tsx
 * @fileoverview Authentication context provider for The Digital Ninja website
 * @description This file defines the AuthProvider component and useAuthContext hook,
 *              which manage and provide access to authentication state throughout the application.
 * 
 * @component AuthProvider
 * @param {React.ReactNode} children - Child components to be wrapped by the AuthProvider
 * 
 * @hook useAuthContext
 * @returns {ReturnType<typeof useAuth>} The authentication context
 * 
 * @exports AuthProvider - Component to provide authentication context
 * @exports useAuthContext - Hook to access authentication context
 */

'use client';

import { useAuth } from '../hooks/useAuth';
import { createContext, useContext } from 'react';

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}