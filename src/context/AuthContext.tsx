import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { API_BASE_URL } from '../config/api';

type User = {
  id: string;
  email: string;
  fullName: string;
  isEmailVerified: boolean;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  initializing: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  completeSignupWithOtp: (email: string, code: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // For now, there is no persisted session. Mark as ready immediately.
    setInitializing(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Sign in failed');
    }
    setToken(data.token);
    setUser(data.user);
  };

  const completeSignupWithOtp = async (email: string, code: string) => {
    const res = await fetch(`${API_BASE_URL}/auth/verify-signup-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Verification failed');
    }
    setToken(data.token);
    setUser(data.user);
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        initializing,
        signIn,
        signOut,
        completeSignupWithOtp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

