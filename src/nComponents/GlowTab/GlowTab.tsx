"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/utils/tailwind-merge";
import { lighten } from 'color2k';
import { useColors } from '@/contexts/ColorContext';
import { AppState } from '@/types/AppStateTypes';

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

interface GlowTabProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  borderWidth?: number;
  colorGroup?: 1 | 2 | 3 | 4 | 5;
  color1?: string;
  color2?: string;
  color3?: string;
  color4?: string;
  effectBackgroundColor?: string;
  colorNestLevel?: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  innerPadding?: number;
  colorCombo?: 1 | 2;
  enableHoverEffect?: boolean;
  glowOverflow?: number | string;
  tabState?: AppState; // New prop for tab state
}

const GlowTab: React.FC<GlowTabProps> = ({
  children,
  className = '',
  containerClassName = '',
  borderWidth = 1,
  colorGroup,
  color1,
  color2,
  color3,
  color4,
  effectBackgroundColor,
  colorNestLevel = 'L1',
  innerPadding = 0,
  colorCombo = 1,
  enableHoverEffect = false,
  glowOverflow = 2,
  tabState = AppState.Inactive, // Default to Inactive
}) => {
  const [isHovered, setIsHovered] = useState(false);
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
    glowDistribution: selectedColors.glowDistribution || HARD_CODED_GLOW_DISTRIBUTION,
    blurEffect: selectedColors.blurEffect || "blur-xl",
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
    blurEffect: safeSelectedColors.blurEffect,
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

  const backgroundColorValue = calculateLightenedBackgroundColor(colorNestLevel, effectiveColors.EFFECT_BACKGROUND_COLOR);
  const calculatedTextColor = calculateTextColor(backgroundColorValue);

  // Calculate padding
  const calculatedPadding = innerPadding;

  // Use a fixed value for border radius
  const borderRadiusFixed = '12px';

  const currentBorderWidth = borderWidth;

  const handleMouseEnter = () => enableHoverEffect && setIsHovered(true);
  const handleMouseLeave = () => enableHoverEffect && setIsHovered(false);

  // Convert glowOverflow to a string with 'px' unit if it's a number
  const glowOverflowValue = typeof glowOverflow === 'number' ? `${glowOverflow}px` : glowOverflow;

  // You can add logic here to apply different styles based on tabState
  // For now, we'll just pass it as a data attribute
  const tabStateAttribute = { 'data-tab-state': tabState };

  return (
    <div
      className={cn(`relative group w-full overflow-visible`, containerClassName)}
      style={{
        padding: `${borderWidth}px`,
        borderRadius: borderRadiusFixed,
        position: 'relative',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...tabStateAttribute}
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
          enableHoverEffect ? 'no-click-effect' : '',
          'flex flex-col items-center justify-center'
        )}
        style={{
          backgroundColor: backgroundColorValue,
          color: calculatedTextColor,
          padding: calculatedPadding,
          borderRadius: `calc(${borderRadiusFixed} - ${currentBorderWidth}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default GlowTab;