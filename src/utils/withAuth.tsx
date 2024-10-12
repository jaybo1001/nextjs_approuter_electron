import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (!session) {
          router.push('/login');
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
}