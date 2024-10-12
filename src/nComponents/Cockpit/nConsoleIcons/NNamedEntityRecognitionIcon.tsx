import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NNamedEntityRecognitionIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NNamedEntityRecognitionIcon: React.FC<NNamedEntityRecognitionIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nNamedEntityRecognitionWorking } = workingState;

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
      animate={nNamedEntityRecognitionWorking ? "animate" : "initial"}
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
      <motion.rect
        x="6"
        y="8"
        width="12"
        height="8"
        rx="2"
        stroke="#ff3c3c"
        strokeWidth="2"
        variants={circleVariants}
      />
      <motion.path
        d="M9 12h6"
        stroke="#ff3c3c"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
    </motion.svg>
  );
};