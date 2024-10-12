'use client'

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import Cockpit from '../nComponents/Cockpit/Cockpit-App';

export default function Home() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setLoading(false);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      router.push('/login'); // Default to login page if there's an error
    }
  };

  if (loading) {
    // Return a loading indicator while checking auth status
    return <div>Loading...</div>;
  }

  // Render your main application layout
  return <Cockpit />;
}
