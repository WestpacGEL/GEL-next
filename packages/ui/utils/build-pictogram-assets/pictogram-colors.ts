import { readFileSync } from 'fs';

// Load the latest GEL brand colours when the script runs.
const allBrands: unknown = JSON.parse(readFileSync('../style-config/src/tokens/w3c/all-brands.json', 'utf8'));
const brands: { brandCode: string; themeName: string }[] = JSON.parse(
  readFileSync('../style-config/src/constants/brands.json', 'utf8'),
);

export const pictogramBrands = ['WBC', 'WBCLEGACY', 'BOM', 'BSA', 'STG'] as const;
export type PictogramBrand = (typeof pictogramBrands)[number];

export type PictogramColors = {
  base: string;
  accent: string;
  mono: string;
};

type TokenObject = {
  $value?: unknown;
  [key: string]: unknown;
};

// Asset folders use uppercase names; the shared registry owns the source allocation.
const brandCodes: Record<PictogramBrand, string> = {
  WBC: 'wbc',
  WBCLEGACY: 'wbcLegacy',
  BOM: 'bom',
  BSA: 'bsa',
  STG: 'stg',
};

// Some colours point to other GEL colours instead of a hex value.
// Follow the references until final colour is found.
const resolveToken = (tokenPath: string): string => {
  const token = tokenPath.split('.').reduce<unknown>((currentValue, key) => {
    if (!currentValue || typeof currentValue !== 'object' || !(key in currentValue)) {
      throw new Error(`Could not find GEL token: ${tokenPath}`);
    }
    return (currentValue as TokenObject)[key];
  }, allBrands);

  const value = (token as TokenObject).$value;

  if (typeof value !== 'string') {
    throw new Error(`GEL token does not contain a string value: ${tokenPath}`);
  }

  const reference = /^\{(.+)\}$/.exec(value);
  return reference ? resolveToken(reference[1]) : value;
};

// Get the base, accent and mono colours used to build a brands SVG files.
export const getPictogramColors = (brand: PictogramBrand): PictogramColors => {
  const allocation = brands.find(({ brandCode }) => brandCode === brandCodes[brand]);
  if (!allocation) {
    throw new Error(`No brand allocation for pictogram folder: ${brand}`);
  }
  const tokenPath = `Tokens.${allocation.themeName}.light-mode.color`;

  return {
    base: resolveToken(`${tokenPath}.pictogram.surface-pictogram-base`),
    accent: resolveToken(`${tokenPath}.pictogram.surface-pictogram-accent`),
    mono: resolveToken(`${tokenPath}.surface.surface-mono`),
  };
};
