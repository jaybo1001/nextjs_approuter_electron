"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { cn } from '@/utils/tailwind-merge'
import { lighten } from 'color2k';
import { useColors } from '@/contexts/ColorContext';


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

/**
 * GlowCard Component
 * 
 * This component provides a customizable card with a glow effect and support for nested levels.
 * 
 * Key features:
 * 1. Dimensions: Supports fullWidth, fullHeight, or specific width/height values.
 * 2. Color customization: Uses Redux state or prop overrides for colors.
 * 3. Glow effect: Customizable glow distribution, width, and blur effect.
 * 4. Hover animations: Optional hover effect for interactivity.
 * 5. Closeable: Option to add a close button.
 * 6. Nesting levels: Supports 5 levels (L1-L5) with automatic text sizing and transparency adjustment.
 * 7. Heading and content: Direct props for adding text content with appropriate styling.
 * If a colorGroup is provided as a prop, it will use that specific color from the Redux store (colors[color${colorGroup}]).
If no colorGroup is provided, it will default to colors.color1 from the Redux store.
 * 
 * Usage examples:
 * <GlowCard width={300} height={200} />
 * <GlowCard width="50%" height="10rem" />
 * <GlowCard fullWidth fullHeight />
 * <GlowCard colorGroup={2} />
 * <GlowCard color1="#FF0000" effectBackgroundColor="#00FF00" />
 * <GlowCard colorNestLevel="L2" heading="Nested Card" content="This is nested content" />
 * 
 * Nesting levels (L1-L5):
 * - Controls background transparency (more transparent for deeper levels)
 * - Adjusts text sizes (smaller for deeper levels)
 * - Creates visual hierarchy in nested structures
 * 
 * Example of nested structure:
 * <GlowCard colorNestLevel="L1">
 *   <GlowCard colorNestLevel="L2">
 *     <GlowCard colorNestLevel="L3" />
 *   </GlowCard>
 * </GlowCard>
 */

interface GlowCardProps {
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
  glowDistribution?: string;
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
}

    const GlowCard: React.FC<GlowCardProps> = ({
  id,
  name,
  description,
  usage,
  componentName,
  componentPath,
  application,
  children,
  className = '',
  containerClassName = '',
  borderWidth = 3,
  textColor = 'auto',
  marginTop = 30,
  marginBottom = 30,
  marginLeft = 30,
  marginRight = 30,
  BackgroundColor,
  fontSize = 'inherit',
  disableClickEffect = false,
  glowDistribution = "100%",
  blurEffect,
  colorGroup,
  color1,
  color2,
  color3,
  color4,
  effectBackgroundColor,
  colorNestLevel = 'L1',
  heading,
  innerPadding = 20,
  bottomPadding,
  colorCombo = 1,
  centerContent = false,
  tabHeight = 40, // Default tab height if not specified
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
    glowDistribution: glowDistribution || safeSelectedColors.glowDistribution,
    blurEffect: blurEffect || safeSelectedColors.blurEffect, // Use prop if provided, otherwise use Redux value
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
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
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

  return (
    <div
      className={cn(`relative group w-full`, containerClassName)}
      style={{
        height: `calc(100% - ${tabHeight}px)`,
        marginTop: `${tabHeight}px`,
        padding: `${currentBorderWidth}px`,
        borderRadius: borderRadiusFixed, // Use the fixed value of 20px
        marginBottom: ensureUnit(marginBottom),
        marginLeft: ensureUnit(marginLeft),
        marginRight: ensureUnit(marginRight),
        position: 'relative',
      }}
    >
      <motion.div
        variants={variants}
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: `${safeSelectedColors.glowDistribution} ${safeSelectedColors.glowDistribution}`,
          backgroundImage: gradientBackground,
          opacity: isHovered ? 1 : 0.6,
          position: "absolute",
          inset: 0,
          borderRadius: borderRadiusFixed, // Use the fixed value of 20px
          height: '100%',
        }}
        className={cn(
          `${effectiveColors.blurEffect} transition duration-500 will-change-transform`
        )}
      />
      <motion.div
        variants={variants}
        animate="animate"
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          backgroundSize: `${safeSelectedColors.glowDistribution} ${safeSelectedColors.glowDistribution}`,
          backgroundImage: gradientBackground,
          position: "absolute",
          inset: 0,
          borderRadius: borderRadiusFixed, // Use the fixed value of 20px
          height: '100%',
        }}
        className={cn("will-change-transform")}
      />
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
          borderRadius: `calc(${borderRadiusFixed} - ${currentBorderWidth}px)`, // Adjust inner content border radius
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

export default GlowCard;