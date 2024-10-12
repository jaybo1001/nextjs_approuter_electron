"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useColors } from '@/contexts/ColorContext';
import GlowCard from '@/GlowUI/GlowCard';
import Slider from '@/GlowUI/GlowSlider';
import NestedGlowCardsExample from './color-settings-example';
//@ts-ignore
import showColorPicker from 'purejs-color-picker';

const blurEffectOptions = [
  'blur-sm',  // 0
  'blur',     // 1
  'blur-md',  // 2
  'blur-lg',  // 3
  'blur-xl',  // 4
  'blur-2xl', // 5
  'blur-3xl', // 6
];

const ColorSettings: React.FC = () => {
  const {
    colorSets,
    activeColorSet,
    setActiveColorSet,
    updateColorSet,
    setGlowDistribution,
    setBlurEffect,
    setWaveWidth,
    setWaveHeight,
    setWaveFrequency,
    setWaveSpeed,
    setWaveOpacity,
    setWaveBlur,
  } = useColors();

  const handleColorSetChange = (setId: number) => {
    setActiveColorSet(setId);
  };

  const handleColorChange = (setId: number, colorKey: keyof ColorSet, value: string) => {
    if (setId === 3) { // Only allow changes to user colors
      const updatedColorSet = {
        ...colorSets[3],
        [colorKey]: value,
      };
      updateColorSet(3, updatedColorSet);
    }
  };

  const handleColorPicker = (setId: number, colorKey: keyof ColorSet, event: React.MouseEvent) => {
    if (setId === 3) { // Only allow color picker for user colors
      showColorPicker({
        color: colorSets[3][colorKey],
        handler: (color: string) => handleColorChange(3, colorKey, color),
        pickerStyle: event.target as HTMLElement,
        dismissable: true,
      });
    }
  };

  const handleGlowDistributionChange = (setId: number, value: number[]) => {
    if (setId === 3) { // Only allow changes to user colors
      const distribution = `${value[0]}%`;
      setGlowDistribution(3, distribution);
    }
  };

  const handleBlurEffectChange = (setId: number, value: number) => {
    if (setId === 3) { // Only allow changes to user colors
      const blurEffect = blurEffectOptions[value];
      setBlurEffect(3, blurEffect);
    }
  };

  const handleWaveWidthChange = (setId: number, value: number[]) => {
    if (setId === 3) {
      setWaveWidth(3, value[0]);
    }
  };

  const handleWaveHeightChange = (setId: number, value: number[]) => {
    if (setId === 3) {
      setWaveHeight(3, value[0]);
    }
  };

  const handleWaveFrequencyChange = (setId: number, value: number[]) => {
    if (setId === 3) {
      setWaveFrequency(3, value[0]);
    }
  };

  const handleWaveSpeedChange = (setId: number, value: string) => {
    if (setId === 3) {
      setWaveSpeed(3, value);
    }
  };

  const handleWaveOpacityChange = (setId: number, value: number[]) => {
    if (setId === 3) {
      setWaveOpacity(3, value[0] / 100);
    }
  };

  const handleWaveBlurChange = (setId: number, value: string) => {
    if (setId === 3) {
      setWaveBlur(3, value);
    }
  };

  const colorLabels = {
    COLOR1: "Color 1:",
    COLOR2: "Color 2:",
    COLOR3: "Color 3:",
    COLOR4: "Color 4:",
    EFFECT_BACKGROUND_COLOR: "Background Color:",
  };

  const cardVariants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, 3, -3, 3, -3, 0],
      scale: [1, 1.05, 1, 1.05, 1],
      transition: {
        duration: 0.7,
        repeat: Infinity,
        repeatType: "loop" as const,
      },
    },
  };

  const colorSetNames = {
    1: 'neucleos Standard',
    2: 'Company Standard',
    3: 'User Custom'
  };

  const renderColorSet = (setId: number, colorSet: ColorSet) => {
    const isActive = activeColorSet === setId;
    const isEditable = setId === 3; // Only user colors are editable

    return (
      <motion.div
        key={setId}
        className={`border p-2 pl-4 pr-4 rounded-lg cursor-pointer hover:shadow-lg transition-all duration-300 ${
          isActive 
            ? 'border-blue-500 border-4 shadow-xl'
            : 'border-gray-300 border-2'
        }`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
        initial="initial"
        whileHover="hover"
        variants={cardVariants}
        onClick={() => handleColorSetChange(setId)}
      >
        <h3 className="text-xl font-semibold mb-2">{colorSetNames[setId as keyof typeof colorSetNames]}</h3>
        <div className="flex flex-col">
          {Object.entries(colorSet).map(([colorKey, colorValue]) => {
            // Only render color-related entries
            if (['COLOR1', 'COLOR2', 'COLOR3', 'COLOR4', 'EFFECT_BACKGROUND_COLOR'].includes(colorKey)) {
              return (
                <div key={colorKey} className="flex items-center mb-2 last:mb-0">
                  <span className="w-1/2 mr-2 text-sm">{colorLabels[colorKey as keyof typeof colorLabels]}</span>
                  <div
                    className={`w-1/2 h-6 rounded ${isEditable ? 'cursor-pointer' : ''}`}
                    style={{ backgroundColor: colorValue }}
                    onClick={(e) => {
                      if (isEditable) {
                        e.stopPropagation();
                        handleColorPicker(setId, colorKey as keyof ColorSet, e);
                      }
                    }}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto max-h-[calc(100vh-200px)]">
      <GlowCard
        id="color-settings"
        name="Color Settings"
      >
        <h2 className="text-2xl font-bold mb-6">Color Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
          {renderColorSet(3, colorSets[3])} {/* User Custom */}
          {renderColorSet(1, colorSets[1])} {/* Neucleos Standard */}
          {renderColorSet(2, colorSets[2])} {/* Company Standard */}
        </div>
      </GlowCard>
      <div className="mt-0 ml-0 flex justify-start">
        <GlowCard
          id="color-controls"   
          name="Color Controls"
          width="100%"
        >
          <div className="grid grid-cols-2 gap-4">
            <GlowCard
              id="distribution-blur-controls"
              name="Distribution and Blur Controls"
              colorNestLevel="L2"

            >
              {activeColorSet === 3 && (
                <>
                  {/* Glow Distribution Slider */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Glow Distribution</h4>
                    <Slider
                      defaultValue={[parseInt(colorSets[3].glowDistribution)]}
                      min={100}
                      max={1000}
                      step={1}
                      onValueChange={(value) => handleGlowDistributionChange(3, value)}
                    />
                    <div className="text-sm mt-2">
                      Current value: {colorSets[3].glowDistribution}
                    </div>
                  </div>

                  {/* Blur Effect Slider */}
                  <div>
                    <h4 className="text-sm font-semibold mb-2">Blur Effect</h4>
                    <Slider
                      defaultValue={[blurEffectOptions.indexOf(colorSets[3].blurEffect)]}
                      min={0}
                      max={6}
                      step={1}
                      onValueChange={(value) => handleBlurEffectChange(3, value[0])}
                    />
                    <div className="text-sm mt-2">
                      Current value: {colorSets[3].blurEffect}
                    </div>
                  </div>
                </>
              )}
            </GlowCard>
            <GlowCard
              id="wave-controls"
              name="Wave Controls"
              colorNestLevel="L2"
              paddingX={10}
              paddingY={10}
            >
              {activeColorSet === 3 && (
                <>
                  <h4 className="text-sm font-semibold mb-2">Wave Width</h4>
                  <Slider
                    defaultValue={[colorSets[3].waveWidth]}
                    min={1}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleWaveWidthChange(3, value)}
                  />
                  <div className="text-sm mt-2 mb-4">
                    Current value: {colorSets[3].waveWidth}
                  </div>

                  <h4 className="text-sm font-semibold mb-2">Wave Height</h4>
                  <Slider
                    defaultValue={[colorSets[3].waveHeight]}
                    min={100}
                    max={1000}
                    step={10}
                    onValueChange={(value) => handleWaveHeightChange(3, value)}
                  />
                  <div className="text-sm mt-2 mb-4">
                    Current value: {colorSets[3].waveHeight}
                  </div>

                  <h4 className="text-sm font-semibold mb-2">Wave Frequency</h4>
                  <Slider
                    defaultValue={[colorSets[3].waveFrequency]}
                    min={100}
                    max={1500}
                    step={10}
                    onValueChange={(value) => handleWaveFrequencyChange(3, value)}
                  />
                  <div className="text-sm mt-2 mb-4">
                    Current value: {colorSets[3].waveFrequency}
                  </div>

                  <h4 className="text-sm font-semibold mb-2">Wave Speed</h4>
                  <select
                    value={colorSets[3].waveSpeed}
                    onChange={(e) => handleWaveSpeedChange(3, e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                  >
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="fast">Fast</option>
                  </select>

                  <h4 className="text-sm font-semibold mb-2">Wave Opacity</h4>
                  <Slider
                    defaultValue={[colorSets[3].waveOpacity * 100]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) => handleWaveOpacityChange(3, value)}
                  />
                  <div className="text-sm mt-2 mb-4">
                    Current value: {(colorSets[3].waveOpacity * 100).toFixed(0)}%
                  </div>

                  <h4 className="text-sm font-semibold mb-2">Wave Blur</h4>
                  <select
                    value={colorSets[3].waveBlur}
                    onChange={(e) => handleWaveBlurChange(3, e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="blur-sm">Small</option>
                    <option value="blur">Medium</option>
                    <option value="blur-md">Large</option>
                    <option value="blur-lg">Extra Large</option>
                    <option value="blur-xl">2X Large</option>
                    <option value="blur-2xl">3X Large</option>
                    <option value="blur-3xl">4X Large</option>
                  </select>
                </>
              )}
            </GlowCard>
          </div>
        </GlowCard>
      </div>
      <div className="mt-8">
        <NestedGlowCardsExample />
      </div>
    </div>
  );
};

export default ColorSettings;