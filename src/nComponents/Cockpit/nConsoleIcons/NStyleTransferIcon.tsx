import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NStyleTransferIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NStyleTransferIcon: React.FC<NStyleTransferIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nStyleTransferWorking } = workingState;

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
      animate={nStyleTransferWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#3cff8f"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M6 12c2-2 4-2 6 0s4 2 6 0"
        stroke="#3cff8f"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.path
        d="M6 16c2-2 4-2 6 0s4 2 6 0"
        stroke="#3cff8f"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};