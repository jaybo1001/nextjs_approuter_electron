"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import Generate_nColorShades from '@/utils/nColors';
import tinycolor from 'tinycolor2';

export interface ColorSet {
  COLOR1: string;
  COLOR1_SHADES: string[];
  COLOR2: string;
  COLOR3: string;
  COLOR4: string;
  COLOR5: string;
  EFFECT_BACKGROUND_COLOR: string;
  glowDistribution: string;
  blurEffect: string;
  waveWidth: number;
  waveHeight: number;
  waveFrequency: number;
  waveSpeed: string;
  waveOpacity: number;
  waveBlur: string;
  ControlsColor1: string;
  ControlsColor2: string;
  FontColor: string;
  FontSize: string;
  FontFamily: string;
  AbyssColor: string; // Add this line
}

interface ColorState {
  colorSets: {
    1: ColorSet;
    2: ColorSet;
    3: ColorSet;
  };
  activeColorSet: number;
}

const NEUCLEOS_STANDARD: ColorSet = {
  COLOR1: "#217CAF",
  COLOR1_SHADES: Generate_nColorShades("#217CAF"),
  COLOR2: "#12b656",
  COLOR3: "#8E154A",
  COLOR4: "#ECA902",
  COLOR5: '#F84e19',
  EFFECT_BACKGROUND_COLOR: "#051721",
  glowDistribution: "100%",
  blurEffect: "blur-xl",
  waveWidth: 50,
  waveHeight: 500,
  waveFrequency: 800,
  waveSpeed: "slow",
  waveOpacity: 0.2,
  waveBlur: "blur-xl",
  ControlsColor1: '', // Will be calculated
  ControlsColor2: '', // Will be calculated
  FontColor: '', // Will be calculated
  FontSize: '16px',
  FontFamily: 'Arial, sans-serif',
  AbyssColor: '#00000000', // 100% transparent black
};

const SIMULATED_ORG_COLORS: ColorSet = {
  COLOR1: "#1A5F8C",
  COLOR1_SHADES: Generate_nColorShades("#1A5F8C"),
  COLOR2: "#4FAAD7",
  COLOR3: "#EF4444",
  COLOR4: "#12B656",
  COLOR5: '#FF9900', // Orange
  EFFECT_BACKGROUND_COLOR: "#0A2A3F",
  glowDistribution: "200%",
  blurEffect: "blur-lg",
  waveWidth: 50,
  waveHeight: 500,
  waveFrequency: 800,
  waveSpeed: "slow",
  waveOpacity: 0.2,
  waveBlur: "blur-lg",
  ControlsColor1: '', // Will be calculated
  ControlsColor2: '', // Will be calculated
  FontColor: '', // Will be calculated
  FontSize: '16px',
  FontFamily: 'Arial, sans-serif',
  AbyssColor: '#00000000', // 100% transparent black
};

const SIMULATED_USER_COLORS: ColorSet = {
  COLOR1: "#FF5733",
  COLOR1_SHADES: Generate_nColorShades("#FF5733"),
  COLOR2: "#33FF57",
  COLOR3: "#5733FF",
  COLOR4: "#FFFF33",
  COLOR5: '#8A2BE2', // Blue Violet
  EFFECT_BACKGROUND_COLOR: "#333333",
  glowDistribution: "150%",
  blurEffect: "blur-md",
  waveWidth: 50,
  waveHeight: 500,
  waveFrequency: 800,
  waveSpeed: "slow",
  waveOpacity: 0.2,
  waveBlur: "blur-md",
  ControlsColor1: '', // Will be calculated
  ControlsColor2: '', // Will be calculated
  FontColor: '', // Will be calculated
  FontSize: '16px',
  FontFamily: 'Arial, sans-serif',
  AbyssColor: '#00000000', // 100% transparent black
};

const initialColorState: ColorState = {
  colorSets: {
    1: NEUCLEOS_STANDARD,
    2: SIMULATED_ORG_COLORS,
    3: SIMULATED_USER_COLORS,
  },
  activeColorSet: 1,
};

interface ColorContextType extends ColorState {
  setActiveColorSet: (id: number) => void;
  updateColorSet: (id: number, colorSet: ColorSet) => void;
  setGlowDistribution: (id: number, distribution: string) => void;
  setBlurEffect: (id: number, effect: string) => void;
  setWaveWidth: (id: number, width: number) => void;
  setWaveHeight: (id: number, height: number) => void;
  setWaveFrequency: (id: number, frequency: number) => void;
  setWaveSpeed: (id: number, speed: string) => void;
  setWaveOpacity: (id: number, opacity: number) => void;
  setWaveBlur: (id: number, blur: string) => void;
  setColor1AndShades: (id: number, color: string) => void;
  updateColor1: (id: number, color: string) => void; // Add this line
  updateAbyssColor: (id: number, color: string) => void; // Add this line
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const useColors = (): ColorContextType => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  return context;
};

const calculateDerivedColors = (color1: string): Pick<ColorSet, 'COLOR2' | 'COLOR3' | 'COLOR4' | 'COLOR5' | 'ControlsColor1' | 'ControlsColor2' | 'FontColor'> => {
  const base = tinycolor(color1);
  const hsl = base.toHsl();

  // Calculate COLOR2-5 based on COLOR1
  const color2 = tinycolor({ h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l }).toHexString();
  const color3 = tinycolor({ h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l }).toHexString();
  const color4 = tinycolor({ h: (hsl.h + 60) % 360, s: hsl.s, l: hsl.l }).toHexString();
  const color5 = tinycolor({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l }).toHexString();

  // Calculate ControlsColor1 and ControlsColor2
  const brightness = base.getBrightness();
  const controlsColor1 = tinycolor.mix(
    tinycolor('#ffffff'),
    tinycolor('#64748b'),
    Math.max(0, Math.min(100, (brightness / 255) * 100))
  ).toHexString();
  const controlsColor2 = tinycolor.mix(
    tinycolor('#1e293b'),
    tinycolor('#000000'),
    Math.max(0, Math.min(100, (brightness / 255) * 100))
  ).toHexString();

  // Calculate FontColor
  const fontColor = brightness > 186 ? '#000000' : '#ffffff';

  return {
    COLOR2: color2,
    COLOR3: color3,
    COLOR4: color4,
    COLOR5: color5,
    ControlsColor1: controlsColor1,
    ControlsColor2: controlsColor2,
    FontColor: fontColor,
  };
};

export const ColorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [colorState, setColorState] = useState<ColorState>(initialColorState);

  const setActiveColorSet = (id: number) => {
    setColorState(prev => ({ ...prev, activeColorSet: id }));
  };

  const updateColorSet = (id: number, colorSet: ColorSet) => {
    if (id === 3) {
      setColorState(prev => ({
        ...prev,
        colorSets: { ...prev.colorSets, 3: colorSet }
      }));
    }
  };

  const setGlowDistribution = (id: number, distribution: string) => {
    if (id === 3) {
      setColorState(prev => ({
        ...prev,
        colorSets: {
          ...prev.colorSets,
          3: { ...prev.colorSets[3], glowDistribution: distribution }
        }
      }));
    }
  };

  const updateColor1 = (id: number, newColor1: string) => {
    const derivedColors = calculateDerivedColors(newColor1);
    const newColorSet: ColorSet = {
      ...colorState.colorSets[id],
      COLOR1: newColor1,
      COLOR1_SHADES: Generate_nColorShades(newColor1),
      ...derivedColors,
    };

    setColorState(prev => ({
      ...prev,
      colorSets: { ...prev.colorSets, [id]: newColorSet },
    }));
  };

  const updateAbyssColor = (id: number, newAbyssColor: string) => {
    setColorState(prev => ({
      ...prev,
      colorSets: {
        ...prev.colorSets,
        [id]: { ...prev.colorSets[id], AbyssColor: newAbyssColor },
      },
    }));
  };

  const contextValue: ColorContextType = {
    ...colorState,
    setActiveColorSet,
    updateColorSet,
    setGlowDistribution,
    setBlurEffect: () => {}, // Implement these functions
    setWaveWidth: () => {},
    setWaveHeight: () => {},
    setWaveFrequency: () => {},
    setWaveSpeed: () => {},
    setWaveOpacity: () => {},
    setWaveBlur: () => {},
    updateColor1, // Add this line
    updateAbyssColor, // Add this line
  };

  return (
    <ColorContext.Provider value={contextValue}>
      {children}
    </ColorContext.Provider>
  );
};