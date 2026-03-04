'use client';

import { useState, useEffect, FormEvent } from 'react';

const AUTH_KEY = 'scs_auth';

// SHA-256 hash of password. Generate with: npm run auth:hash -- yourpassword
const PASSWORD_HASH =
  '631b94b7432ce4279bb1cef3bc8610aaedb2c361dfacaeb8d1b66d8666f6b7d2';

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsAuthenticated(sessionStorage.getItem(AUTH_KEY) === '1');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    const inputHash = await hashPassword(password);
    if (inputHash === PASSWORD_HASH) {
      sessionStorage.setItem(AUTH_KEY, '1');
      setIsAuthenticated(true);
    } else {
      setError('Wrong password');
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-pulse text-white/50">Loading...</div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xs space-y-4 rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
      >
        <h2 className="text-center text-lg font-medium text-white">
          Welcome
        </h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Your email password"
          className="w-full rounded-md border border-white/20 bg-black/50 px-4 py-3 text-white placeholder:text-white/40 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          autoFocus
        />
        {error && (
          <p className="text-center text-sm text-red-400">{error}</p>
        )}
        <button
          type="submit"
          className="w-full rounded-md bg-[var(--accent)] px-4 py-3 font-medium text-white transition hover:opacity-90"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
