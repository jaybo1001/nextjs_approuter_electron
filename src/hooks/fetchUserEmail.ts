import { useState, useEffect } from 'react';
import { createClient } from '../utils/supabase/client';
import { User } from '@supabase/supabase-js';

export const useUserEmail = (): string | null => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUserEmail(user.email);
      }
    };

    fetchUserEmail();
  }, []);

  return userEmail;
};