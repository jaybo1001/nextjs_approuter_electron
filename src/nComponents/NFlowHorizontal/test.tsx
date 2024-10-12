import { useState, useCallback, useMemo } from 'react';
import { AccordionState, PanelData } from './types-NFlowHorizontal';

export const useProcessExecution = (items: PanelData[]) => {
  const initialState: AccordionState = useMemo(() => ({
    currentStep: 0,
    expandedPanel: null,
    openSlots: {},
    panelStates: Array(items.length).fill("waiting"),
    isStarted: false,
    isCompleted: false,
    processVariables: {}
  }), [items.length]);

  const [state, setState] = useState<AccordionState>(initialState);

  const resetToDefault = useCallback(() => {
    setState(initialState);
  }, [initialState]);

  const executeProcess = useCallback(() => {
    let step = 0;
    let currentPanel = 0;
    let currentSlot = -1;
    
    const interval = setInterval(() => {
      setState(prevState => {
        const newState = { ...prevState };
        
        if (step === 0) {
          newState.isStarted = true;
          newState.expandedPanel = 0;
          newState.panelStates = ["active", ...Array(items.length - 1).fill("waiting")];
          newState.processVariables.processStarted = true;
        } else if (currentSlot === items[currentPanel].slots.length) {
          // Move to next panel
          newState.panelStates[currentPanel] = "complete";
          currentPanel++;
          currentSlot = -1;
          
          if (currentPanel < items.length) {
            newState.expandedPanel = currentPanel;
            newState.panelStates[currentPanel] = "active";
            newState.processVariables[`panel${currentPanel + 1}Started`] = true;
          } else {
            // Process completed
            newState.isCompleted = true;
            newState.expandedPanel = null;
            newState.openSlots = {};
            newState.processVariables.processCompleted = true;
            clearInterval(interval);
          }
        } else {
          // Open next slot
          currentSlot++;
          newState.openSlots = { [currentPanel]: currentSlot };
          newState.processVariables[`panel${currentPanel + 1}Slot${currentSlot + 1}`] = `Completed`;
        }
        
        newState.currentStep = step;
        step++;
        
        return newState;
      });
    }, 1000); // Change state every second
    
    return () => clearInterval(interval);
  }, [items]);

  return {
    state,
    setState,
    resetToDefault,
    executeProcess
  };
};
