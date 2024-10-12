import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NTextToVideoIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NTextToVideoIcon: React.FC<NTextToVideoIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nTextToVideoWorking } = workingState;

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
      animate={nTextToVideoWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#8f3cff"
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
        stroke="#8f3cff"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.path
        d="M10 9L16 12L10 15V9Z"
        stroke="#8f3cff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};