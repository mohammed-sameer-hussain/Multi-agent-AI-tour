import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthResponse } from '../types.ts';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginDemo: (type?: 'explorer' | 'traveler') => Promise<void>;
  logout: () => Promise<void>;
  toggleSaveTour: (tourId: string) => Promise<void>;
  isTourSaved: (tourId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check current session on mount
  useEffect(() => {
    async function loadUser() {
      try {
        const storedToken = localStorage.getItem('echoguide_token');
        if (storedToken) {
          setToken(storedToken);
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          if (res.ok) {
            const data = await res.json();
            if (data.user) {
              setUser(data.user);
            } else {
              localStorage.removeItem('echoguide_token');
              setToken(null);
            }
          }
        }
      } catch (err) {
        console.warn('Failed to verify session:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to sign in');
    }

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('echoguide_token', data.token);
  };

  const register = async (email: string, password: string, name: string) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to create account');
    }

    setUser(data.user);
    setToken(data.token);
    localStorage.setItem('echoguide_token', data.token);
  };

  const loginDemo = async (type: 'explorer' | 'traveler' = 'explorer') => {
    const creds = type === 'explorer'
      ? { email: 'explorer@echoguide.ai', password: 'explorer123!' }
      : { email: 'traveler@echoguide.ai', password: 'traveler123!' };
    await login(creds.email, creds.password);
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // ignore network errors on logout
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('echoguide_token');
  };

  const toggleSaveTour = async (tourId: string) => {
    if (!user) return;
    try {
      const res = await fetch('/api/auth/toggle-save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ tourId }),
      });
      if (res.ok) {
        const data = await res.json();
        setUser(prev => prev ? { ...prev, savedTourIds: data.savedTourIds } : null);
      }
    } catch (err) {
      console.warn('Failed to toggle save tour:', err);
    }
  };

  const isTourSaved = (tourId: string): boolean => {
    return user ? user.savedTourIds.includes(tourId) : false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isLoading,
      login,
      register,
      loginDemo,
      logout,
      toggleSaveTour,
      isTourSaved
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
