"use client";
import React, { useEffect, useState } from 'react';
import { IconSettings, IconChevronRight } from "@tabler/icons-react";
import { useRightPanel } from "@/contexts/RightPanelContext";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/contexts/AppStateContext";

const CockpitRightHeaderModule: React.FC = () => {
  const { activeApp, isOpen, togglePanel } = useRightPanel();
  const { appState, setPanelSize } = useAppState();
  const [lastOpenSize, setLastOpenSize] = useState(appState.panelSizes.rightPanel);

  useEffect(() => {
    if (isOpen && appState.panelSizes.rightPanel > 3) {
      setLastOpenSize(appState.panelSizes.rightPanel);
    }
  }, [isOpen, appState.panelSizes.rightPanel]);

  const handleToggle = () => {
    if (isOpen) {
      // Closing the panel
      setPanelSize('rightPanel', 3);
      setPanelSize('mainPanel', appState.panelSizes.mainPanel + appState.panelSizes.rightPanel - 3);
    } else {
      // Opening the panel
      setPanelSize('rightPanel', lastOpenSize);
      setPanelSize('mainPanel', appState.panelSizes.mainPanel - lastOpenSize + 3);
    }
    togglePanel();
  };

  return (
    <motion.div 
      className="flex items-center justify-between p-4 bg-white dark:bg-transparent"
      animate={{ width: isOpen ? '100%' : '48px' }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
      >
        {isOpen ? (
          <IconSettings className="text-neutral-700 dark:text-neutral-200 h-6 w-6 cursor-pointer" />
        ) : (
          <IconChevronRight className="text-neutral-700 dark:text-neutral-200 h-6 w-6 cursor-pointer" />
        )}
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="flex items-center justify-between flex-1 ml-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-xl font-semibold text-center">{activeApp}</h1>
            <IconSettings className="text-neutral-700 dark:text-neutral-200 h-6 w-6" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CockpitRightHeaderModule;
