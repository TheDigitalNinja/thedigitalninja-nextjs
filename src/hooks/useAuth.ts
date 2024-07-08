'use client';

import { useState, useEffect } from 'react';
import { User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (auth) {
      const unsubscribe = auth.onAuthStateChanged(setUser);
      return unsubscribe;
    }
  }, []);

  const signIn = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in with Google', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      }
    }
  };

  const signOutUser = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  return { user, signIn, signOutUser };
}