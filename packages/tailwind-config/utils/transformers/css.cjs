/*
TO DO
- refactor/cleanup
*/
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const tokensPath = path.resolve(__dirname, '../../src/tokens/GEL-tokens-figma.json');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

const themeTemplatePath = path.resolve(__dirname, '../templates/theme.handlebars');
const themeTemplateSource = fs.readFileSync(themeTemplatePath, 'utf8');
const sharedStylesTemplatePath = path.resolve(__dirname, '../templates/colors.handlebars');
const sharedStylesTemplateSource = fs.readFileSync(sharedStylesTemplatePath, 'utf8');

const themeTemplate = Handlebars.compile(themeTemplateSource);
const sharedStylesTemplate = Handlebars.compile(sharedStylesTemplateSource);

// rename these
const colorsObj = {};
const tokensObj = {};

const brandNameMap = {
  westpac: 'wbc',
  stgeorge: 'stg',
};

// Mapping for Brand font family
const brandFontMap = {
  wbc: 'Westpac',
  stg: 'Dragon Bold',
};

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
// Flatten color objects
function flattenColors(obj, parentKey = '', result = {}) {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null && !obj[key].$value) {
      flattenColors(
        obj[key],
        parentKey ? `${parentKey}-${key.toLowerCase().replace(/\s+/g, '-')}` : key.toLowerCase(),
        result,
      );
    } else if (obj[key]?.$value) {
      result[`${parentKey}-${key.toLowerCase().replace(/\s+/g, '-')}`] = obj[key].$value;
    }
  }
  return result;
}

// Helper to convert a reference string to a primitive CSS variable name
function refToVar(ref) {
  // {color.WBC.Grey.50} => var(--wbc-grey-50)
  let match = ref.match(/\{color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, brand, color, shade] = match;
    return `var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }
  // {color.muted.950} => var(--muted-950)
  match = ref.match(/\{color\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, color, shade] = match;
    return `var(--${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }
  // {color.hero.500} => var(--hero-500)
  match = ref.match(/\{color\.([^.]+)\}/i);
  if (match) {
    const [_, color] = match;
    return `var(--${color.toLowerCase().replace(/\s+/g, '-')})`;
  }
  // Otherwise output as is
  return ref;
}

// Format border radius object for tailwind use
// - replace key 'rounded' with 'radius'
// - remove radius-none and radius-full and use the default tailwind values
function formatBorderRadius(obj) {
  const remapped = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/^rounded/, 'radius');
      // Skip 'radius-none' and 'radius-full'
      if (newKey === 'radius-none' || newKey === 'radius-full') continue;
      let value = obj[key];
      if (typeof value === 'string') {
        value = value.replace(/border-radius/g, 'rounded');
      }
      remapped[newKey] = value;
    }
  }
  return remapped;
}
// --------------------------------------------------------------------------
// Primitive Values
// --------------------------------------------------------------------------
const primitives = tokens.find(t => t.Primitives)?.Primitives?.modes?.['Mode 1']?.color;
if (primitives) {
  for (const parentKey in primitives) {
    const colors = flattenColors(primitives[parentKey], parentKey.toLowerCase());
    colorsObj[parentKey.toLowerCase()] = colorsObj[parentKey.toLowerCase()] || {};
    colorsObj[parentKey.toLowerCase()].primitives = colors;
  }
}

// Function to extract border radius primitives and generate CSS variables
function getBorderPrimitives(tokens) {
  const primitives = tokens.find(t => t.Primitives)?.Primitives?.modes?.['Mode 1']?.border?.radius;
  if (!primitives) return {};
  const borderVars = {};
  for (const key in primitives) {
    if (primitives[key]?.$value !== undefined) {
      // Convert key to kebab-case for CSS variable
      const varName = `border-radius-${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
      borderVars[varName] = `${primitives[key].$value}px`;
    }
  }
  return borderVars;
}

// --------------------------------------------------------------------------
// Theme values
// --------------------------------------------------------------------------
const themes = tokens.find(t => t.Themes)?.Themes?.modes;
if (themes) {
  for (const brand in themes) {
    const themeColors = themes[brand]?.color;
    if (themeColors) {
      const colors = flattenColors(themeColors, brand.toLowerCase());
      const cleanedColors = {};
      for (const name in colors) {
        // Remove brand prefix from variable name
        let unprefixed = name.replace(new RegExp(`^${brand.toLowerCase()}-`), '');
        // Remove 'alias' prefix from variable name
        if (unprefixed.startsWith('alias-')) {
          unprefixed = unprefixed.replace(/^alias-/, '');
        }
        // Remove references to 'alias' in variable values
        let value = colors[name];
        if (typeof value === 'string' && value.startsWith('{color.alias.')) {
          const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
          if (aliasMatch) {
            const [_, aliasName] = aliasMatch;
            value = `var(--${aliasName.toLowerCase().replace(/\s+/g, '-')})`;
          }
        } else if (typeof value === 'string' && value.startsWith('{color.')) {
          value = refToVar(value);
        }
        cleanedColors[unprefixed] = value;
      }
      colorsObj[brandNameMap[brand.toLowerCase()]] = colorsObj[brandNameMap[brand.toLowerCase()]] || {};
      colorsObj[brandNameMap[brand.toLowerCase()]].theme = cleanedColors;
    }
  }
}

// Function to extract border radii from each brand in the themes object and generate CSS variables
function getThemeBrandBorders(tokens) {
  const themes = tokens.find(t => t.Themes)?.Themes?.modes;
  if (!themes) return {};
  const brandBorders = {};
  for (const brand in themes) {
    const borderRadii = themes[brand]?.border?.radius;
    if (borderRadii) {
      const cssVars = {};
      for (const key in borderRadii) {
        if (borderRadii[key]?.$value !== undefined) {
          // Convert key to kebab-case for CSS variable
          const varName = `border-radius-${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
          let value = borderRadii[key].$value;
          // If value is a reference, convert to CSS var reference
          if (typeof value === 'string' && value.startsWith('{border.radius.')) {
            const ref = value.match(/\{border\.radius\.([^.}]+)\}/i);
            if (ref) {
              const refVar = `--border-radius-${ref[1].replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
              value = `var(${refVar})`;
            }
          } else if (typeof value === 'number') {
            value = `${value}px`;
          }
          cssVars[varName] = value;
        }
      }
      brandBorders[brandNameMap[brand.toLowerCase()] || brand.toLowerCase()] = cssVars;
    }
  }
  return brandBorders;
}

// --------------------------------------------------------------------------
// Tokens
// --------------------------------------------------------------------------
const tokensBlock = tokens.find(t => t.Tokens)?.Tokens?.modes;
if (tokensBlock) {
  for (const mode in tokensBlock) {
    const modeColors = tokensBlock[mode]?.color;
    if (modeColors) {
      const colors = flattenColors(modeColors, '');
      const tokenObj = {};
      function removeDuplicatePrefix(name) {
        const parts = name.split('-');
        const result = [parts[0]];
        for (let i = 1; i < parts.length; i++) {
          if (parts[i] !== parts[i - 1]) {
            result.push(parts[i]);
          }
        }
        if (result[0] === 'state') result.shift();
        if (result[0] === 'pictogram' && result[1] === 'surface' && result[2] === 'pictogram') result.shift();
        return result.join('-');
      }

      Object.entries(colors).forEach(([name, value]) => {
        let unprefixed = name.replace(new RegExp(`^${mode.toLowerCase()}-`), '');
        unprefixed = removeDuplicatePrefix(unprefixed);
        if (unprefixed.startsWith('alias-')) {
          unprefixed = unprefixed.replace(/^alias-/, '');
        }
        if (typeof value === 'string' && value.startsWith('{color.alias.')) {
          const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
          if (aliasMatch) {
            const [_, aliasName] = aliasMatch;
            value = `var(--${aliasName.toLowerCase().replace(/\s+/g, '-')})`;
          }
        } else if (typeof value === 'string' && value.startsWith('{color.')) {
          value = refToVar(value);
        }
        tokenObj[unprefixed] = value;
      });

      tokensObj[mode.toLowerCase().split(' ')[0]] = tokenObj;
    }
  }
}

// Function to extract border radii for light mode and dark mode and generate CSS variables
function getModeBorders(tokens) {
  const modes = tokens.find(t => t.Tokens)?.Tokens?.modes;
  if (!modes) return {};
  const modeBorders = {};
  for (const modeName in modes) {
    const borderRadii = modes[modeName]?.border?.radius;
    if (borderRadii) {
      const cssVars = {};
      for (const key in borderRadii) {
        if (borderRadii[key]?.$value !== undefined) {
          // Convert key to kebab-case for CSS variable
          const varName = `${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
          let value = borderRadii[key].$value;
          // If value is a reference, convert to CSS var reference
          if (typeof value === 'string' && value.startsWith('{border.radius.')) {
            const ref = value.match(/\{border\.radius\.([^.}]+)\}/i);
            if (ref) {
              const refVar = `--border-radius-${ref[1].replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
              value = `var(${refVar})`;
            }
          } else if (typeof value === 'number') {
            value = `${value}px`;
          }
          cssVars[varName] = value;
        }
      }
      // Use 'light' and 'dark' as keys for easier access
      const modeKey = modeName.toLowerCase().includes('dark') ? 'dark' : 'light';
      modeBorders[modeKey] = cssVars;
    }
  }
  return modeBorders;
}

// --------------------------------------------------------------------------
// Output CSS files
// --------------------------------------------------------------------------
const themeBorderRadius = getThemeBrandBorders(tokens);
const modeBorderRadius = getModeBorders(tokens);

// Colors
const brandOutputDir = path.resolve(__dirname, '../../src/css/themes');
['wbc', 'stg'].forEach(brand => {
  const brandFile = path.resolve(brandOutputDir, `theme-${brand}.css`);
  fs.writeFileSync(
    brandFile,
    themeTemplate({
      brand,
      primitiveColors: colorsObj[brand]?.primitives || {},
      themeColors: colorsObj[brand]?.theme || {},
      borderRadius: themeBorderRadius[brand] || {},
      fontFamily: brandFontMap[brand] || '',
    }),
  );
});

const colorsOutputFile = path.resolve(__dirname, '../../src/css/shared/colors.css');
fs.writeFileSync(
  colorsOutputFile,
  sharedStylesTemplate({
    reserved: colorsObj.reserved?.primitives || {},
    light: tokensObj.light || {},
    dark: tokensObj.dark || {},
  }),
);

// Borders
const bordersTemplatePath = path.resolve(__dirname, '../templates/borders.handlebars');
const bordersTemplateSource = fs.readFileSync(bordersTemplatePath, 'utf8');
const bordersTemplate = Handlebars.compile(bordersTemplateSource);

const borderPrimitives = getBorderPrimitives(tokens);
const borderOutputFile = path.resolve(__dirname, '../../src/css/shared/borders.css');
const borderCss = bordersTemplate({
  borders: borderPrimitives,
  light: modeBorderRadius.light || {},
  dark: modeBorderRadius.dark || {},
  radius: formatBorderRadius(modeBorderRadius.light || {}),
});
fs.writeFileSync(borderOutputFile, borderCss);

console.log;
