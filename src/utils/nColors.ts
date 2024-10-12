import Color from 'color';

export default function Generate_nColorShades(baseColor: string): string[] {
  const color = Color(baseColor);
  return [
    color.lighten(0.3).hex(),  // Lightest shade
    color.lighten(0.1).hex(),  // Light shade
    baseColor,                 // Original color
    color.darken(0.1).hex(),   // Dark shade
    color.darken(0.3).hex()    // Darkest shade
  ];
}