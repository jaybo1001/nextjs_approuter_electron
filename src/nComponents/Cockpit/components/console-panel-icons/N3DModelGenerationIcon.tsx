import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface N3DModelGenerationIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const N3DModelGenerationIcon: React.FC<N3DModelGenerationIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { n3DModelGenerationWorking } = workingState;

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
      animate={n3DModelGenerationWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ff9f3c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M12 6v12M6 12l6 6 6-6"
        stroke="#ff9f3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.path
        d="M6 9l6-3 6 3"
        stroke="#ff9f3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};