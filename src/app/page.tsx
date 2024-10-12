'use client'

import React from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  console.log("Home: Component rendered");
  const router = useRouter();
  const { user } = useAuth();

  React.useEffect(() => {
    if (user) {
      console.log("Home: User authenticated, redirecting to /protected");
      router.push('/protected');
    }
  }, [user, router]);

  console.log("Home: Rendering loading state");
  return <div>Loading...</div>;
}
