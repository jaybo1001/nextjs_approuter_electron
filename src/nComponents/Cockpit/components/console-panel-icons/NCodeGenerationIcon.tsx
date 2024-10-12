import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NCodeGenerationIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NCodeGenerationIcon: React.FC<NCodeGenerationIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nCodeGenerationWorking } = workingState;

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
      animate={nCodeGenerationWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#ff3c3c"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M8 10l-2 2 2 2M16 10l2 2-2 2M13 8l-2 8"
        stroke="#ff3c3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};