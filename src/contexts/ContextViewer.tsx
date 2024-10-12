import React from 'react';
import { useWorkingState } from './WorkingStateContext';
import { Button, VStack, HStack, Text } from '@chakra-ui/react';

const ContextViewer: React.FC = () => {
  const { workingState, setWorkingState } = useWorkingState();

  const toggleWorkingState = (key: keyof typeof workingState) => {
    setWorkingState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <VStack spacing={4} align="stretch">
      <Text fontSize="xl" fontWeight="bold">Working State Context Viewer</Text>
      {Object.entries(workingState).map(([key, value]) => (
        <HStack key={key} justifyContent="space-between">
          <Text>{key}: {value.toString()}</Text>
          <Button 
            onClick={() => toggleWorkingState(key as keyof typeof workingState)}
            colorScheme={value ? "green" : "red"}
          >
            Toggle {key}
          </Button>
        </HStack>
      ))}
    </VStack>
  );
};

export default ContextViewer;
