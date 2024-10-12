'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '../../../../../@/contexts/WorkingStateContext';

const NTimeSeriesForecasting: React.FC = () => {
  const { workingState } = useWorkingState();
  const { nTimeSeriesForecastingWorking } = workingState;

  const imageVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="nTimeSeriesForecasting flex flex-col h-full w-full bg-black text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Time Series Forecasting</h2>
      <motion.img
        src="/TimeSeriesForecasting_concept.svg"
        alt="Time Series Forecasting Workflow"
        className="w-full h-auto"
        variants={imageVariants}
        initial="initial"
        animate={nTimeSeriesForecastingWorking ? 'animate' : 'initial'}
      />
    </div>
  );
};

export default NTimeSeriesForecasting;