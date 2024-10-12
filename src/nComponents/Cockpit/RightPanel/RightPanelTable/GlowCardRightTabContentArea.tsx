"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind-merge";
import { lighten } from 'color2k';
import { useColors } from '@/contexts/ColorContext';

// Add this constant at the top of the file, after imports and helper functions
const HARD_CODED_GLOW_DISTRIBUTION = "100%";

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

interface GlowCardRightTabContentAreaProps {
  id: string;
  name: string;
  description: string;
  usage: string;
  componentName: string;
  componentPath: string;
  application: string;
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderWidth?: number;
  colorSet?: number;
  paddingX?: number | string;
  paddingY?: number | string;
  textColor?: string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  BackgroundColor?: string;
  fontSize?: string;
  disableClickEffect?: boolean;
  backgroundTransparency?: number;
  glowDistribution?: string; // Keep this prop for backwards compatibility
  blurEffect?: string;
  colorGroup?: 1 | 2 | 3 | 4 | 5;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  effectBackgroundColor?: string;
  colorNestLevel?: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  heading?: string;
  innerPadding?: number;
  bottomPadding?: number | string;
  colorCombo?: 1 | 2;
  centerContent?: boolean;
  tabHeight?: number; // New prop to specify the height of the tabs
  enableHoverEffect?: boolean; // New prop for hover effect
  glowOverflow?: number | string; // New prop for glow overflow
}

const GlowCardRightTabContentArea: React.FC<GlowCardRightTabContentAreaProps> = ({
  children,
  className = '',
  containerClassName = '',
  borderWidth = 3,
  textColor = 'auto',
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 2,
  marginRight = 0,
  BackgroundColor,
  fontSize = 'inherit',
  disableClickEffect = false,
  glowDistribution = HARD_CODED_GLOW_DISTRIBUTION, // Use the hard-coded value as default
  blurEffect,
  colorGroup,
  color1,
  color2,
  color3,
  color4,
  effectBackgroundColor,
  colorNestLevel = 'L1',
  heading,
  innerPadding = 0,
  bottomPadding,
  colorCombo = 2,
  centerContent = false,
  tabHeight = 52, // Default tab height if not specified
  enableHoverEffect = false, // Default to false
  glowOverflow = 0, // Default to 2px
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Replace Redux useSelector with useColors hook
  const { colorSets, activeColorSet } = useColors();

  // Safely access the active color set
  const activeColors = colorSets[activeColorSet as keyof typeof colorSets] || colorSets[1];

  let selectedColors = activeColors;
  if (colorGroup && colorSets[colorGroup as keyof typeof colorSets]) {
    selectedColors = colorSets[colorGroup as keyof typeof colorSets];
  }

  // Ensure all required properties are present
  const safeSelectedColors = {
    COLOR1: color1 || selectedColors.COLOR1 || "#000000",
    COLOR2: color2 || selectedColors.COLOR2 || "#000000",
    COLOR3: color3 || selectedColors.COLOR3 || "#000000",
    COLOR4: color4 || selectedColors.COLOR4 || "#000000",
    EFFECT_BACKGROUND_COLOR: effectBackgroundColor || selectedColors.EFFECT_BACKGROUND_COLOR || "#000000",
    glowDistribution: selectedColors.glowDistribution || glowDistribution,
    blurEffect: blurEffect || selectedColors.blurEffect || "blur-xl",
  };

  // Create a new object with overrides instead of reassigning
  const effectiveColors = {
    ...safeSelectedColors,
    COLOR1: color1 || safeSelectedColors.COLOR1,
    COLOR2: color2 || safeSelectedColors.COLOR2,
    COLOR3: color3 || safeSelectedColors.COLOR3,
    COLOR4: color4 || safeSelectedColors.COLOR4,
    EFFECT_BACKGROUND_COLOR: effectBackgroundColor || safeSelectedColors.EFFECT_BACKGROUND_COLOR,
    glowDistribution: HARD_CODED_GLOW_DISTRIBUTION, // Always use the hard-coded value
    blurEffect: blurEffect || safeSelectedColors.blurEffect,
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

  const getGradientBackground = (combo: number) => {
    if (combo === 1) {
      return `radial-gradient(circle farthest-side at 0 100%,${effectiveColors.COLOR1},transparent),
              radial-gradient(circle farthest-side at 100% 0,${effectiveColors.COLOR2},transparent),
              radial-gradient(circle farthest-side at 100% 100%,${effectiveColors.COLOR3},transparent),
              radial-gradient(circle farthest-side at 0 0,${effectiveColors.COLOR4},${effectiveColors.EFFECT_BACKGROUND_COLOR})`;
    } else if (combo === 2) {
      return `radial-gradient(circle farthest-side at 0 100%,${effectiveColors.COLOR3},transparent),
              radial-gradient(circle farthest-side at 100% 0,${effectiveColors.COLOR4},transparent),
              radial-gradient(circle farthest-side at 100% 100%,${effectiveColors.COLOR1},transparent),
              radial-gradient(circle farthest-side at 0 0,${effectiveColors.COLOR2},${effectiveColors.EFFECT_BACKGROUND_COLOR})`;
    }
    // Default to combo 1 if an invalid value is provided
    return `radial-gradient(circle farthest-side at 0 100%,${effectiveColors.COLOR1},transparent),
            radial-gradient(circle farthest-side at 100% 0,${effectiveColors.COLOR2},transparent),
            radial-gradient(circle farthest-side at 100% 100%,${effectiveColors.COLOR3},transparent),
            radial-gradient(circle farthest-side at 0 0,${effectiveColors.COLOR4},${effectiveColors.EFFECT_BACKGROUND_COLOR})`;
  };

  const gradientBackground = getGradientBackground(colorCombo);

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

  // Calculate padding
  const calculatedPadding = bottomPadding !== undefined
    ? `${innerPadding}px ${innerPadding}px ${bottomPadding}px ${innerPadding}px`
    : innerPadding;

  // Use a fixed value for border radius
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

  // Convert glowOverflow to a string with 'px' unit if it's a number
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
          disableClickEffect ? 'no-click-effect' : '',
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

export default GlowCardRightTabContentArea;
