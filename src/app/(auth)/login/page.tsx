'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import SignIn from '@/nComponents/n-sign-in/n-sign-in';

export default function LoginPage() {
  console.log("LoginPage: Rendering");
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      console.log("LoginPage: User already authenticated, redirecting to /protected");
      router.push('/protected');
    }
  }, [user, router]);

  if (user) {
    return null;
  }

  return <SignIn />;
}
