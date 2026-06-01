import { useEffect, useState } from 'react';

export interface SessionUser {
  name: string;
  email: string;
  payerId: string;
}

interface SessionState {
  user: SessionUser | null;
  loading: boolean;
}

export function useSession(): SessionState & { signOut: () => Promise<void> } {
  const [state, setState] = useState<SessionState>({ user: null, loading: true });

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => r.json())
      .then((data: { authenticated: boolean; name?: string; email?: string; payerId?: string }) => {
        if (data.authenticated) {
          setState({ user: { name: data.name!, email: data.email!, payerId: data.payerId! }, loading: false });
        } else {
          setState({ user: null, loading: false });
        }
      })
      .catch(() => setState({ user: null, loading: false }));
  }, []);

  async function signOut() {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setState({ user: null, loading: false });
    window.location.href = '/';
  }

  return { ...state, signOut };
}
