'use client';

import { type FormEvent, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AUTH_PASSWORD_HASH, AUTH_STORAGE_KEY } from '../config/constants';
import { hashPassword } from '../lib/hash-password';
import type { AuthGateProps } from '../model/types';

export function AuthGate({ children }: AuthGateProps) {
  const isAuthenticated = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener('storage', onStoreChange);
      window.addEventListener('auth-state-change', onStoreChange);
      return () => {
        window.removeEventListener('storage', onStoreChange);
        window.removeEventListener('auth-state-change', onStoreChange);
      };
    },
    () => sessionStorage.getItem(AUTH_STORAGE_KEY) === '1',
    () => null
  );
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isAuthenticated !== false) return;
    passwordInputRef.current?.focus();
  }, [isAuthenticated]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    const inputHash = await hashPassword(password);
    if (inputHash === AUTH_PASSWORD_HASH) {
      sessionStorage.setItem(AUTH_STORAGE_KEY, '1');
      window.dispatchEvent(new Event('auth-state-change'));
      return;
    }
    setError('Wrong password');
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) return <>{children}</>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-4 rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      >
        <h2 className="text-center text-lg font-medium text-white">Welcome</h2>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Your email password"
          className="w-full rounded-md border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          ref={passwordInputRef}
        />
        {error ? <p className="text-center text-sm text-red-400">{error}</p> : null}
        <button type="submit" className="w-full rounded-md bg-[var(--accent)] px-4 py-3 font-medium text-white transition hover:opacity-90">
          Enter
        </button>
      </form>
    </div>
  );
}
