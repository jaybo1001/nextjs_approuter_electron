import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NObjectDetectionIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NObjectDetectionIcon: React.FC<NObjectDetectionIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nObjectDetectionWorking } = workingState;

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
      animate={nObjectDetectionWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ff8f3c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.rect
        x="6"
        y="6"
        width="12"
        height="12"
        stroke="#ff8f3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.circle
        cx="10"
        cy="10"
        r="2"
        stroke="#ff8f3c"
        strokeWidth="2"
        variants={circleVariants}
      />
    </motion.svg>
  );
};