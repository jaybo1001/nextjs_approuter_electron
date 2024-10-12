import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NAnomalyDetectionIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NAnomalyDetectionIcon: React.FC<NAnomalyDetectionIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nAnomalyDetectionWorking } = workingState;

  const circleVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ scale }}
      initial="initial"
      animate={nAnomalyDetectionWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ff3c8f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M8 12h2l2-6 2 12 2-6h2"
        stroke="#ff3c8f"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};