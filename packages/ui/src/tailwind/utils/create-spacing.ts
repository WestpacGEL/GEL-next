type SpacingRecord = Record<number, string>;
export const createSpacing = (spacingUnit: number, spacingScale: number, addMinorScale: boolean) => {
  return Array.from({ length: 36 }).reduce<SpacingRecord>((spacing, _, i) => {
    spacing[i] = `${(i * spacingUnit) / spacingScale}rem`;
    if (addMinorScale && i < 35) {
      spacing[i + 0.5] = `${((i + 0.5) * spacingUnit) / spacingScale}rem`;
    }
    return spacing;
  }, {} as SpacingRecord);
};
