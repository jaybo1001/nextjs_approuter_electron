"use client";

import React from "react";
import { useRouter } from 'next/navigation';
import Cockpit from '@/nComponents/Cockpit/Cockpit-App';
import { useAuth } from '@/contexts/AuthContext';

const ProtectedPage: React.FC = () => {
  console.log("ProtectedPage: Component rendered");
  const { user } = useAuth();
  const router = useRouter();

  console.log("ProtectedPage: Initial state", { userExists: !!user });

  React.useEffect(() => {
    if (!user) {
      console.log("ProtectedPage: No user found, redirecting to /login");
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    console.log("ProtectedPage: No user, rendering null");
    return null;
  }

  console.log("ProtectedPage: User authenticated, rendering Cockpit");
  return (
    <div className="w-full h-full">
      <Cockpit />
    </div>
  );
};

export default ProtectedPage;
