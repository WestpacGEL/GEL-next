import { SPACING_LENGTH } from '../constants/spacing.js';
import { type SPACING_KEY } from '../types/theme.types.js';

type SpacingRecord = Record<SPACING_KEY, string>;
export const createSpacing = (spacingUnit: number, spacingScale: number) => {
  return Array.from({ length: SPACING_LENGTH }).reduce<SpacingRecord>(
    (spacing, _, i) => {
      const newIndex = ++i;
      spacing[newIndex as SPACING_KEY] = `${(newIndex * spacingUnit) / spacingScale}rem`;

      return spacing;
    },
    { 0: '0' } as SpacingRecord,
  );
};
