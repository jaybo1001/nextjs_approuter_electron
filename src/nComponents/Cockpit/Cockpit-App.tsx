"use client";

import React, { useState, useCallback } from 'react';
import { motion, PanInfo } from 'framer-motion';
import LeftControls2 from '@/nComponents/Cockpit/components/LeftControls2';
import RightControls2 from '@/nComponents/Cockpit/components/RightControls2';
import AppTabs from '@/nComponents/Cockpit/App/AppTabs';
import ConsolePanel2 from '@/nComponents/Cockpit/CockpitPanels/ConsolePanel2';
import RightPanelTabContent from '@/nComponents/Cockpit/RightPanel/RightPanel';
import Footer from '@/nComponents/footer/';

const Cockpit: React.FC = () => {
  const [layout, setLayout] = useState({
    rightSidebar: 20,
    bottomDivider: 70,
  });

  const handleDrag = useCallback((info: PanInfo, direction: 'horizontal' | 'vertical', divider: 'rightSidebar' | 'bottomDivider') => {
    setLayout((prev) => {
      const delta = direction === 'horizontal' ? info.delta.x : info.delta.y;
      const containerSize = direction === 'horizontal' ? window.innerWidth : window.innerHeight;
      let newValue;

      if (divider === 'rightSidebar') {
        newValue = prev[divider] - (delta / containerSize) * 100;
      } else {
        newValue = prev[divider] + (delta / containerSize) * 100;
      }

      return { ...prev, [divider]: Math.max(10, Math.min(90, newValue)) };
    });
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col text-white bg-gray-900">
      <div className="flex-1 flex overflow-hidden">
        <div className="h-full w-[65px] flex-shrink-0">
          <LeftControls2 />
        </div>
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto" style={{ height: `${layout.bottomDivider}%` }}>
              <AppTabs />
            </div>
            <motion.div
              className="h-[20px] bg-red-500 cursor-ns-resize hover:bg-red-600 transition-colors flex items-center justify-center"
              drag="y"
              dragMomentum={false}
              dragElastic={0}
              dragConstraints={{ top: 0, bottom: 0 }}
              onDrag={(_, info) => handleDrag(info, 'vertical', 'bottomDivider')}
            >
              <div className="w-10 h-2 bg-white rounded-full"></div>
            </motion.div>
            <div className="overflow-hidden" style={{ height: `${100 - layout.bottomDivider}%` }}>
              <ConsolePanel2 />
            </div>
          </div>
          <motion.div
            className="w-[10px] bg-blue-500 cursor-ew-resize hover:bg-blue-600 transition-colors"
            drag="x"
            dragMomentum={false}
            dragElastic={0}
            dragConstraints={{ left: 0, right: 0 }}
            onDrag={(_, info) => handleDrag(info, 'horizontal', 'rightSidebar')}
          />
          <div className="h-full overflow-auto" style={{ width: `${layout.rightSidebar}%` }}>
            <RightPanelTabContent />
          </div>
          <div className="h-full w-[65px] flex-shrink-0">
            <RightControls2 />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cockpit;
