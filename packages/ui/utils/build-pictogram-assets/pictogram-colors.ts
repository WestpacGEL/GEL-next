import { readFileSync } from 'fs';

// Load the latest GEL brand colours when the script runs.
const allBrands: unknown = JSON.parse(readFileSync('../style-config/src/tokens/w3c/all-brands.json', 'utf8'));

export const pictogramBrands = ['WBC', 'BOM', 'BSA', 'STG'] as const;
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

// Match each asset folder name to the brand name used in the GEL colour file.
const brandTokenNames: Record<PictogramBrand, string> = {
  WBC: 'Westpac',
  BOM: 'Bank of Melbourne',
  BSA: 'Bank SA',
  STG: 'StGeorge',
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
  const tokenPath = `Tokens.${brandTokenNames[brand]}.light-mode.color`;

  return {
    base: resolveToken(`${tokenPath}.pictogram.surface-pictogram-base`),
    accent: resolveToken(`${tokenPath}.pictogram.surface-pictogram-accent`),
    mono: resolveToken(`${tokenPath}.surface.surface-mono`),
  };
};
