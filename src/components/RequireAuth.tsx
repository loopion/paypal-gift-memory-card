import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useSession();

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-[#F5F7FA]">
        <div className="w-8 h-8 border-2 border-[#008CFF] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
