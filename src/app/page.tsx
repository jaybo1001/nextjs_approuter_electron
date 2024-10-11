'use client'

import React from "react";
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const simulateLoggedIn = () => {
    // Here you would typically set some auth state or token
    // For now, we'll just navigate to the protected page
    router.push('/protected');
  };

  return (
    <div className="w-screen h-screen p-8 flex flex-col items-center justify-center">
      <Button color="primary" className="mb-4" onPress={() => router.push('/login')}>Sign In</Button>
      <Button color="secondary" className="mb-4" onPress={() => router.push('/signup')}>Sign Up</Button>
      <Button color="success" onPress={simulateLoggedIn}>Simulate User Already Logged In</Button>
    </div>
  );
}
