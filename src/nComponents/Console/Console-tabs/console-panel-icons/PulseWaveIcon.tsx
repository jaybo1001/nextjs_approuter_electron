import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface PulseWaveIconProps {
  size?: number;
  className?: string;
  scale?: number;
  isHovered?: MotionValue<number>;
  loadingState?: boolean;
}

export const PulseWaveIcon: React.FC<PulseWaveIconProps> = ({
  size = 24,
  className,
  scale = 1,
  isHovered,
  loadingState = false,
}) => {
  console.log('PulseWaveIcon rendered:', { size, className, scale, isHovered, loadingState });
  const shouldAnimate = React.useMemo(() => {
    const hovered = isHovered ? isHovered.get() === 1 : false;
    return hovered || loadingState;
  }, [isHovered, loadingState]);

  const ballVariants = {
    animate: {
      y: [0, -8, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    stop: {
      y: 0,
      transition: {
        duration: 0.5,
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
    >
      {[6, 12, 18].map((cx, index) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="12"
          r="2"
          fill="currentColor"
          animate={shouldAnimate ? 'animate' : 'stop'}
          variants={ballVariants}
          transition={{ delay: index * 0.2 }}
        />
      ))}
    </motion.svg>
  );
};