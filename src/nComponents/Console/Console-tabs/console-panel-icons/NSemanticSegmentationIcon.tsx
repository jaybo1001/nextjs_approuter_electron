import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NSemanticSegmentationIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NSemanticSegmentationIcon: React.FC<NSemanticSegmentationIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nSemanticSegmentationWorking } = workingState;

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
      animate={nSemanticSegmentationWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#3c8fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M6 18l4-4 4 4 4-4"
        stroke="#3c8fff"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.path
        d="M6 6l4 4 4-4 4 4"
        stroke="#3c8fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 8"
        variants={circleVariants}
      />
    </motion.svg>
  );
};