import { type BrandConfig, type BrandKey } from '@westpac/ui/tailwind';
import { ALL_THEMES } from '@westpac/ui/themes';
import { BASE_COLORS } from '@westpac/ui/themes-constants';

import { PRIMARY_COLORS, SECONDARY_COLORS } from './colors.constants';

const hexToRgb = (hex: string) =>
  hex
    ?.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_m, r, g, b) => '#' + r + r + g + g + b + b)
    ?.substring(1)
    ?.match(/.{2}/g)
    ?.map(x => parseInt(x, 16));

export function getColorPalette({ brand, palette }: { brand: BrandKey; palette: string }) {
  const colorPalette: { hex: string; name: string; rgb: string }[] = [];
  if (palette === 'primary') {
    const theme = ALL_THEMES.find((brandTheme: BrandConfig) => brandTheme.code === brand.toUpperCase())?.colors;
    if (theme) {
      PRIMARY_COLORS.forEach(color => {
        const hex = theme[color].DEFAULT;
        const rgb = hexToRgb(hex) || [];
        colorPalette.push({
          name: color[0].toUpperCase() + color.slice(1),
          hex,
          rgb: `R:${rgb[0]} G:${rgb[1]} B:${rgb[2]}`,
        });
      });
    }
  } else if (palette === 'secondary') {
    Object.entries(SECONDARY_COLORS[brand]).forEach(([name, hex]) => {
      const rgb = hexToRgb(hex) || [];
      colorPalette.push({ name, hex, rgb: `R:${rgb[0]} G:${rgb[1]} B:${rgb[2]}` });
    });
  } else if (palette === 'reserved') {
    Object.entries(BASE_COLORS).forEach(([key, hex]) => {
      const rgb = hexToRgb(hex) || [];
      colorPalette.push({ name: key[0].toUpperCase() + key.slice(1), hex, rgb: `R:${rgb[0]} G:${rgb[1]} B:${rgb[2]}` });
    });
  }
  return colorPalette;
}
