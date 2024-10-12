
"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardBody, Spinner } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useColors } from '@/contexts/ColorContext';
import GlowCardBK from '@/nComponents/GlowCard/GlowCardBK';

const CodebaseManager: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulating data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GlowCardBK
        id="codebase-manager"
        name="Codebase Manager"
        description="Manage your codebase"
        usage="Codebase management tool"
        componentName="CodebaseManager"
        componentPath="/protected/nApps/CodebaseManager"
        application="CodebaseManager"
        className="p-4"
        colorSet={2}
      >
        <Card>
          <CardBody>
            <h1 className="text-2xl font-bold mb-4">Codebase Manager</h1>
            <p>Welcome, {user?.name}! This is where you'll manage your codebase.</p>
            {/* Add more components and functionality here */}
          </CardBody>
        </Card>
      </GlowCardBK>
    </motion.div>
  );
};

export default CodebaseManager;
