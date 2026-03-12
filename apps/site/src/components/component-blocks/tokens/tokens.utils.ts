import { ALL_BRANDS } from '@westpac/style-config';

type ColorCategory = {
  background: Record<string, { $description?: string; $value?: string }>;
  border: Record<string, { $description?: string; $value?: string }>;
  data: Record<string, { $description?: string; $value?: string }>;
  pictogram: Record<string, { $description?: string; $value?: string }>;
  state: Record<string, { $description?: string; $value?: string }>;
  surface: Record<string, { $description?: string; $value?: string }>;
  text: Record<string, { $description?: string; $value?: string }>;
};

type BorderCategory = {
  radius: Record<string, { $description?: string; $value?: string }>;
};

type BrandTokens = Record<
  string,
  Record<
    string,
    {
      color: ColorCategory;
      border?: BorderCategory;
    }
  >
>;

export type TokenItem = {
  tokenName: string;
  description?: string;
  fillColour?: string;
  strokeColour?: string;
  textColour?: string;
  circleType?: 'solid' | 'borderColour' | 'textColour' | 'border';
  restricted?: boolean;
  new?: boolean;
};

export type TokensData = {
  title?: string;
  tokens?: TokenItem[];
};

export type ColorType = 'background' | 'border' | 'data' | 'pictogram' | 'state' | 'surface' | 'text';

// Function to process ALL_BRANDS for tokens like background-white
function resolveHexFromToken(tokenObj: { $value?: string }): string {
  const valueStr = tokenObj.$value;
  if (typeof valueStr === 'string' && valueStr.startsWith('{Primitives.')) {
    const path = valueStr.replace(/[{}]/g, '').split('.');
    let obj: unknown = ALL_BRANDS.Primitives;
    for (let i = 1; i < path.length; i++) {
      if (typeof obj === 'object' && obj !== null && path[i] in obj) {
        obj = (obj as Record<string, unknown>)[path[i]];
      } else {
        obj = undefined;
        break;
      }
    }
    if (obj && typeof obj === 'object' && '$value' in obj) {
      return obj.$value as string;
    }
    if (typeof obj === 'string') {
      return obj;
    }
    return '';
  }
  return typeof valueStr === 'string' ? valueStr : '';
}

function resolveRoundedToken(brands: BrandTokens, brand: string, mode: string, token: string): string {
  const borderRadius = brands[brand]?.[mode]?.border?.radius;
  const tokenObj = borderRadius?.[token];
  if (tokenObj && typeof tokenObj === 'object' && '$value' in tokenObj) {
    const ref = tokenObj.$value;
    if (typeof ref === 'string' && ref.startsWith('{') && ref.endsWith('}')) {
      const refPath = ref.slice(1, -1).split('.');
      return refPath[refPath.length - 1];
    }
  }
  return '';
}

export function processAllBrands(brand = 'Westpac', mode = 'light-mode', token?: string): string {
  const brands = ALL_BRANDS.Tokens as BrandTokens;
  if (!brands[brand] || !brands[brand][mode] || !brands[brand][mode].color) {
    return '';
  }
  const colorCategories = brands[brand][mode].color;

  if (token) {
    if (token.startsWith('rounded')) {
      return resolveRoundedToken(brands, brand, mode, token);
    }
    for (const base of Object.keys(colorCategories) as ColorType[]) {
      const tokens = colorCategories[base];
      if (token in tokens) {
        return resolveHexFromToken(tokens[token]);
      }
    }
  }
  return '';
}
