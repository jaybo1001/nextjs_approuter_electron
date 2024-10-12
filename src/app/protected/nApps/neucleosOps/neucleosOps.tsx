"use client"

import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';

const NeucleosOps: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkGradioApp = async () => {
      try {
        const response = await fetch('http://127.0.0.1:7860/');
        if (response.ok) {
          setIsLoaded(true);
        }
      } catch (error) {
        console.error('Gradio app is not running locally:', error);
      }
    };

    checkGradioApp();
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!isLoaded) {
    return (
      <Box p={4}>
        <p>Gradio app is not running locally. Please start the app and refresh this page.</p>
        <Button onClick={handleRefresh} mt={2}>Refresh</Button>
      </Box>
    );
  }

  return (
    <Box w="100%" h="100vh">
      <iframe
        src="http://127.0.0.1:7860/"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Neucleos Ops Gradio App"
      />
    </Box>
  );
};

export default NeucleosOps;

