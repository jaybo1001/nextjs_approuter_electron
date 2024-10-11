"use client";

import React, { useState } from "react";
import { Button, Input, Link, Divider, ResizablePanel } from "@nextui-org/react";
import { AnimatePresence, m, domAnimation, LazyMotion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function SignIn() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const variants = {
    visible: {opacity: 1, y: 0},
    hidden: {opacity: 0, y: 10},
  };

  const orDivider = (
    <div className="flex items-center gap-4 py-2">
      <Divider className="flex-1" />
      <p className="shrink-0 text-tiny text-default-500">OR</p>
      <Divider className="flex-1" />
    </div>
  );

  const onSwitchToSignUp = () => {
    router.push('/signup');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error signing in:', error.message);
      // Handle error (e.g., show error message to user)
    } else {
      console.log('Signed in successfully:', data);
      router.push('/protected'); // Redirect to protected page after successful login
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        <ResizablePanel>
          <h1 className="mb-4 text-xl font-medium">Log In</h1>
          <AnimatePresence initial={false} mode="popLayout">
            <LazyMotion features={domAnimation}>
              {isFormVisible ? (
                <m.form
                  animate="visible"
                  className="flex flex-col gap-y-3"
                  exit="hidden"
                  initial="hidden"
                  variants={variants}
                  onSubmit={handleSignIn}
                >
                  <Input
                    autoFocus
                    label="Email Address"
                    name="email"
                    type="email"
                    variant="bordered"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                    label="Password"
                    name="password"
                    type="password"
                    variant="bordered"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button color="primary" type="submit">
                    Log In
                  </Button>
                  {orDivider}
                  <Button
                    fullWidth
                    startContent={
                      <Icon
                        className="text-default-500"
                        icon="solar:arrow-left-linear"
                        width={18}
                      />
                    }
                    variant="flat"
                    onPress={() => setIsFormVisible(false)}
                  >
                    Other Login options
                  </Button>
                </m.form>
              ) : (
                <>
                  <Button
                    fullWidth
                    color="primary"
                    startContent={
                      <Icon className="pointer-events-none text-2xl" icon="solar:letter-bold" />
                    }
                    type="button"
                    onPress={() => setIsFormVisible(true)}
                  >
                    Continue with Email
                  </Button>
                  {orDivider}
                  <m.div
                    animate="visible"
                    className="flex flex-col gap-y-2"
                    exit="hidden"
                    initial="hidden"
                    variants={variants}
                  >
                    <div className="flex flex-col gap-2">
                      <Button
                        fullWidth
                        startContent={<Icon icon="flat-color-icons:google" width={24} />}
                        variant="flat"
                      >
                        Continue with Google
                      </Button>
                      <Button
                        fullWidth
                        startContent={
                          <Icon className="text-default-500" icon="fe:github" width={24} />
                        }
                        variant="flat"
                      >
                        Continue with Github
                      </Button>
                    </div>
                    <p className="mt-3 text-center text-small">
                      Need to create an account?&nbsp;
                      <Link href="#" size="sm" onPress={onSwitchToSignUp}>
                        Sign Up
                      </Link>
                    </p>
                  </m.div>
                </>
              )}
            </LazyMotion>
          </AnimatePresence>
        </ResizablePanel>
      </div>
    </div>
  );
}