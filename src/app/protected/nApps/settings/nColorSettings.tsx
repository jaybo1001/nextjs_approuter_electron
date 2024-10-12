"use client";

import React, { useState, useEffect } from 'react';
import { useColors, ColorSet } from '@/contexts/ColorContext';
import { HexColorPicker, HexColorInput, RgbaColorPicker } from 'react-colorful';
import { GlowButtonMovingBorder } from '@/components/GlowUI/GlowButtonMovingBorder';
import { VStack, HStack, Text, Flex } from '@chakra-ui/react';
import tinycolor from 'tinycolor2';

const NColorSettings: React.FC = () => {
  const { colorSets, activeColorSet, updateColor1, updateColorSet, updateAbyssColor } = useColors();
  const [currentColors, setCurrentColors] = useState<ColorSet>(colorSets[3]);
  const [tempAbyssColor, setTempAbyssColor] = useState(colorSets[3].AbyssColor);

  useEffect(() => {
    setCurrentColors(colorSets[3]);
    setTempAbyssColor(colorSets[3].AbyssColor);
  }, [colorSets]);

  const handleColorChange = (newColor: string) => {
    updateColor1(3, newColor);
    // Update local state immediately with new derived colors
    const updatedColors = {
      ...colorSets[3],
      COLOR1: newColor,
      ...calculateDerivedColors(newColor),
    };
    setCurrentColors(updatedColors);
  };

  const handleAbyssColorChange = (newColor: { r: number; g: number; b: number; a: number }) => {
    setTempAbyssColor(`rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`);
  };

  const handleSaveAbyssColor = () => {
    updateAbyssColor(3, tempAbyssColor);
  };

  const handleSetNeucleosStandard = () => {
    updateColor1(3, "#217CAF");
    setTempAbyssColor('#00000000');
    updateAbyssColor(3, '#00000000');
  };

  const handleSaveColors = () => {
    updateColorSet(3, currentColors);
  };

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <VStack>
      <Flex w="50px" h="50px" bg={color} borderRadius="md" />
      <Text fontSize="sm" color={currentColors.FontColor}>{label}</Text>
    </VStack>
  );

  return (
    <Flex direction="column" bg={tempAbyssColor} border="1px solid" borderColor={currentColors.COLOR1} p={4}>
      <Text fontSize="2xl" fontWeight="bold" mb={4} color={currentColors.FontColor}>Color Settings</Text>

      <Flex>
        <Flex direction="column" bg="transparent" flex={1} mr={4}>
          <HStack spacing={4} mb={4}>
            <VStack align="stretch">
              <Text color={currentColors.FontColor}>Primary Color (COLOR1)</Text>
              <HexColorPicker color={currentColors.COLOR1} onChange={handleColorChange} />
              <HexColorInput color={currentColors.COLOR1} onChange={handleColorChange} />
            </VStack>

            <VStack align="stretch" spacing={4}>
              <Text color={currentColors.FontColor}>Color Palette</Text>
              <HStack spacing={4}>
                <ColorSwatch color={currentColors.COLOR1} label="COLOR1" />
                <ColorSwatch color={currentColors.COLOR2} label="COLOR2" />
                <ColorSwatch color={currentColors.COLOR3} label="COLOR3" />
                <ColorSwatch color={currentColors.COLOR4} label="COLOR4" />
                <ColorSwatch color={currentColors.COLOR5} label="COLOR5" />
              </HStack>
              <HStack spacing={4}>
                <ColorSwatch color={currentColors.ControlsColor1} label="Controls 1" />
                <ColorSwatch color={currentColors.ControlsColor2} label="Controls 2" />
                <ColorSwatch color={currentColors.FontColor} label="Font" />
              </HStack>
            </VStack>
          </HStack>

          <HStack spacing={4}>
            <GlowButtonMovingBorder 
              onClick={handleSetNeucleosStandard}
              highlightColor={currentColors.COLOR1}
            >
              Neucleos Standard
            </GlowButtonMovingBorder>
            <GlowButtonMovingBorder 
              onClick={handleSaveColors}
              highlightColor={currentColors.COLOR1}
            >
              Save Palette
            </GlowButtonMovingBorder>
          </HStack>
        </Flex>

        <Flex direction="column" bg="transparent" flex={1}>
          <Text mb={2} color={currentColors.FontColor}>Abyss Color</Text>
          <RgbaColorPicker color={tinycolor(tempAbyssColor).toRgb()} onChange={handleAbyssColorChange} />
          <GlowButtonMovingBorder 
            onClick={handleSaveAbyssColor}
            highlightColor={currentColors.COLOR1}
            className="mt-4"
          >
            Save Abyss
          </GlowButtonMovingBorder>
        </Flex>
      </Flex>
    </Flex>
  );
};

// Add this helper function at the end of the file
const calculateDerivedColors = (color1: string) => {
  const base = tinycolor(color1);
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
  const fontColor = brightness > 186 ? '#000000' : '#ffffff';

  return { ControlsColor1: controlsColor1, ControlsColor2: controlsColor2, FontColor: fontColor };
};

export default NColorSettings;
