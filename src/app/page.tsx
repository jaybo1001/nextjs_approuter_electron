'use client'

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/protected');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      router.push('/login'); // Default to login page if there's an error
    }
  };

  // Return null or a loading indicator while checking auth status
  return <div>Loading...</div>; // Or use a more sophisticated loading component
}
