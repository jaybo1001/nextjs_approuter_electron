"use client";

import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { lighten } from 'color2k';
import { useColors } from '@/contexts/ColorContext';

// Add this constant at the top of the file, after imports and helper functions
const HARD_CODED_GLOW_DISTRIBUTION = "150%";

const ensureUnit = (value: string | number): string => {
  if (typeof value === 'number' || !isNaN(Number(value))) {
    return `${value}px`;
  }
  return value.toString();
};

// Add this helper function at the top of the file, outside the component
const parseToRgb = (color: string) => {
  // Remove the hash if it's there
  color = color.replace(/^#/, '');
  
  // Parse the color
  const bigint = parseInt(color, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  
  return { r, g, b, luminosity: () => (0.299 * r + 0.587 * g + 0.114 * b) / 255 };
};

interface GlowCardTemplateProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderWidth?: number;
  textColor?: string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  BackgroundColor?: string;
  fontSize?: string;
  glowDistribution?: string;
  blurEffect?: string;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  effectBackgroundColor?: string;
  heading?: string;
  innerPadding?: number;
  bottomPadding?: number | string;
  centerContent?: boolean;
  tabHeight?: number;
  enableHoverEffect?: boolean;
  glowOverflow?: number | string;
  colorNestLevel?: string;
}

const GlowCardTemplate: React.FC<GlowCardTemplateProps> = ({
  children,
  className = '',
  containerClassName = '',
  borderWidth = 1,
  textColor = 'auto',
  marginBottom = 0,
  marginLeft = 4,
  marginRight = 40,
  fontSize = 'inherit',
  color1,
  color2,
  color3,
  color4,
  effectBackgroundColor,
  heading,
  innerPadding = 20,
  bottomPadding,
  centerContent = false,
  tabHeight = 0,
  enableHoverEffect = false,
  glowOverflow = 0,
  colorNestLevel = 'L1',
  BackgroundColor,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const { colorSets, activeColorSet } = useColors();

  const activeColors = colorSets[activeColorSet as keyof typeof colorSets] || colorSets[1];

  const effectiveColors = {
    COLOR1: color1 || activeColors.COLOR1,
    COLOR2: color2 || activeColors.COLOR2,
    COLOR3: color3 || activeColors.COLOR3,
    COLOR4: color4 || activeColors.COLOR4,
    EFFECT_BACKGROUND_COLOR: effectBackgroundColor || activeColors.EFFECT_BACKGROUND_COLOR,
    glowDistribution: HARD_CODED_GLOW_DISTRIBUTION,
    blurEffect: activeColors.blurEffect,
  };

  const calculateLightenedBackgroundColor = (level: string, baseColor: string) => {
    const levelIndex = parseInt(level.slice(1)) - 1;
    
    // Use color2k to lighten the color
    const lightenedColor = lighten(baseColor, levelIndex * 0.1);
    
    return lightenedColor;
  };

  const calculateTextColor = (backgroundColor: string) => {
    const color = parseToRgb(backgroundColor);
    const luminance = color.luminosity();
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  };

  const gradientBackground = `
    radial-gradient(circle farthest-side at 0 100%,${effectiveColors.COLOR1},transparent),
    radial-gradient(circle farthest-side at 100% 0,${effectiveColors.COLOR2},transparent),
    radial-gradient(circle farthest-side at 100% 100%,${effectiveColors.COLOR3},transparent),
    radial-gradient(circle farthest-side at 0 0,${effectiveColors.COLOR4},${effectiveColors.EFFECT_BACKGROUND_COLOR})
  `;

  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0 50%", "100% 50%", "0 50%"],
    },
  };

  const getHeadingClass = (level: string) => {
    switch (level) {
      case 'L1': return 'text-lg font-semibold mb-2';
      case 'L2': return 'text-md font-semibold mb-2';
      case 'L3': return 'text-sm font-semibold mb-2';
      case 'L4': return 'text-xs font-semibold mb-2';
      case 'L5': return 'text-xs font-semibold mb-2';
      default: return 'text-sm font-semibold mb-2';
    }
  };

  const getContentClass = (level: string) => {
    switch (level) {
      case 'L1': return 'text-sm mb-4';
      case 'L2': return 'text-sm mb-4';
      case 'L3': return 'text-xs mb-4';
      case 'L4': return 'text-xs mb-4';
      case 'L5': return 'text-xs mb-4';
      default: return 'text-xs mb-4';
    }
  };

  const backgroundColorValue = BackgroundColor || calculateLightenedBackgroundColor(colorNestLevel, effectiveColors.EFFECT_BACKGROUND_COLOR);
  const calculatedTextColor = textColor === 'auto' ? calculateTextColor(backgroundColorValue) : textColor;

  const calculatedPadding = bottomPadding !== undefined
    ? `${innerPadding}px ${innerPadding}px ${bottomPadding}px ${innerPadding}px`
    : innerPadding;

  const borderRadiusFixed = '12px';

  const currentBorderWidth = borderWidth;

  const handleMouseEnter = () => {
    if (enableHoverEffect) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (enableHoverEffect) {
      setIsHovered(false);
    }
  };

  const glowOverflowValue = typeof glowOverflow === 'number' ? `${glowOverflow}px` : glowOverflow;

  return (
    <div
      className={cn(`relative group w-full overflow-visible`, containerClassName)}
      style={{
        height: `calc(100% - ${tabHeight}px)`,
        marginTop: `${tabHeight}px`,
        padding: `${currentBorderWidth}px`,
        borderRadius: borderRadiusFixed,
        marginBottom: ensureUnit(marginBottom),
        marginLeft: ensureUnit(marginLeft),
        marginRight: ensureUnit(marginRight),
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow container */}
      <div
        style={{
          position: 'absolute',
          top: `-${glowOverflowValue}`,
          left: `-${glowOverflowValue}`,
          right: `-${glowOverflowValue}`,
          bottom: `-${glowOverflowValue}`,
          borderRadius: `calc(${borderRadiusFixed} + ${glowOverflowValue})`,
          overflow: 'hidden',
        }}
      >
        {/* Blurred gradient layer */}
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "400% 400%",
            backgroundImage: gradientBackground,
            position: "absolute",
            inset: 0,
            opacity: enableHoverEffect && isHovered ? 1 : 0.6,
          }}
          className={cn(
            `${effectiveColors.blurEffect} transition-opacity duration-300`
          )}
        />
        {/* Sharp gradient layer */}
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundSize: "400% 400%",
            backgroundImage: gradientBackground,
            position: "absolute",
            inset: 0,
          }}
        />
      </div>
      {/* Content container */}
      <div
        className={cn(
          "relative z-10 flex-grow overflow-auto w-full h-full",
          className,
          centerContent ? 'flex flex-col items-center justify-center' : ''
        )}
        style={{
          backgroundColor: backgroundColorValue,
          color: calculatedTextColor,
          fontSize: fontSize,
          padding: calculatedPadding,
          borderRadius: `calc(${borderRadiusFixed} - ${currentBorderWidth}px)`,
        }}
      >
        {heading && (
          <h3 className={getHeadingClass(colorNestLevel)}>{heading}</h3>
        )}
        {children}
      </div>
    </div>
  );
};

export default GlowCardTemplate;