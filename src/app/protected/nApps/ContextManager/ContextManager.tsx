import React from 'react';
import { useWorkingState } from '../../../../contexts/WorkingStateContext';
import { useCockpitTabs } from '../../../../contexts/CockpitTabsContext';
import { Button, VStack, HStack, Text, Box, Divider } from '@chakra-ui/react';

const ContextManager: React.FC = () => {
  const { workingState, setWorkingState } = useWorkingState();
  const { tabs, activeTabId } = useCockpitTabs();

  const toggleWorkingState = (key: keyof typeof workingState) => {
    setWorkingState(prevState => ({
      ...prevState,
      [key]: !prevState[key]
    }));
  };

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>Working State Context Viewer</Text>
        {Object.entries(workingState).map(([key, value]) => (
          <HStack key={key} justifyContent="space-between" mb={2}>
            <Text>{key}: {value.toString()}</Text>
            <Button 
              onClick={() => toggleWorkingState(key as keyof typeof workingState)}
              colorScheme={value ? "green" : "red"}
              size="sm"
            >
              Toggle {key}
            </Button>
          </HStack>
        ))}
      </Box>

      <Divider />

      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>Cockpit Tabs Context Viewer</Text>
        <Text fontWeight="semibold" mb={2}>Open Tabs:</Text>
        {tabs.map(tab => (
          <HStack key={tab.id} justifyContent="space-between" mb={2}>
            <Text>{tab.label} ({tab.componentName})</Text>
            <Text color={tab.id === activeTabId ? "green.500" : "gray.500"}>
              {tab.id === activeTabId ? "Active" : "Inactive"}
            </Text>
          </HStack>
        ))}
        <Text fontWeight="semibold" mt={4}>Active Tab ID: {activeTabId || "None"}</Text>
      </Box>
    </VStack>
  );
};

export default ContextManager;