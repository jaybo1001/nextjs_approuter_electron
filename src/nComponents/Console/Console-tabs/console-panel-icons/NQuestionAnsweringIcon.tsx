import React from 'react';
import { motion } from 'framer-motion';
import { useWorkingState } from '@/contexts/WorkingStateContext';

interface NQuestionAnsweringIconProps {
  size?: number;
  className?: string;
  scale?: number;
}

export const NQuestionAnsweringIcon: React.FC<NQuestionAnsweringIconProps> = ({
  size = 24,
  className,
  scale = 1,
}) => {
  const { workingState } = useWorkingState();
  const { nQuestionAnsweringWorking } = workingState;

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
      animate={nQuestionAnsweringWorking ? "animate" : "initial"}
      whileHover="animate"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="#3cefff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="16 48"
        variants={circleVariants}
      />
      <motion.path
        d="M8 10h8M8 14h6M12 18h2"
        stroke="#3cefff"
        strokeWidth="2"
        strokeLinecap="round"
        variants={circleVariants}
      />
      <motion.circle cx="12" cy="7" r="1" fill="#3cefff" variants={circleVariants} />
    </motion.svg>
  );
};