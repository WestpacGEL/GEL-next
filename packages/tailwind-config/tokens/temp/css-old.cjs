const fs = require('fs');
const path = require('path');

const tokensPath = path.resolve(__dirname, '../tokens/figma-tokens.json');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

// TODO: Add other brands once added to figma tokens file

const brandMap = {
  StGeorge: 'stg',
  Westpac: 'wbc',
};

// Helper to flatten color objects
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

let sharedBlocks = [];
let brandBlocks = {};

// Primitives
const primitives = tokens.find(t => t.Primitives)?.Primitives?.modes?.['Mode 1']?.color;
if (primitives) {
  for (const parentKey in primitives) {
    const colors = flattenColors(primitives[parentKey], parentKey.toLowerCase());
    const className = `.${parentKey.toLowerCase()}`;
    const vars = Object.entries(colors)
      .map(([name, value]) => `--${name}: ${value};`)
      .join('\n');
    sharedBlocks.push(vars);
  }
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

// Themes for each brand
const themes = tokens.find(t => t.Themes)?.Themes?.modes;
if (themes) {
  for (const brand in themes) {
    const themeColors = themes[brand]?.color;
    if (themeColors) {
      const colors = flattenColors(themeColors, brand.toLowerCase());
      const className = `.${brand.toLowerCase()}-theme`;
      const vars = Object.entries(colors)
        .map(([name, value]) => {
          // Remove brand prefix from variable name
          let unprefixed = name.replace(new RegExp(`^${brand.toLowerCase()}-`), '');
          // Remove 'alias' prefix from variable name
          if (unprefixed.startsWith('alias-')) {
            unprefixed = unprefixed.replace(/^alias-/, '');
          }
          // Remove references to 'alias' in variable values
          if (typeof value === 'string' && value.startsWith('{color.alias.')) {
            // e.g. {color.alias.text-body-Lm} => var(--text-body-lm)
            const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
            if (aliasMatch) {
              const [_, aliasName] = aliasMatch;
              return `  --${unprefixed}: var(--${aliasName.toLowerCase().replace(/\s+/g, '-')});`;
            }
          }
          if (typeof value === 'string' && value.startsWith('{color.')) {
            return `  --${unprefixed}: ${refToVar(value)};`;
          }
          return `  --${unprefixed}: ${value};`;
        })
        .join('\n');
      brandBlocks[brandMap[brand]] = vars;
    }
  }
}

// Tokens
const tokensBlock = tokens.find(t => t.Tokens)?.Tokens?.modes;
if (tokensBlock) {
  for (const mode in tokensBlock) {
    const modeColors = tokensBlock[mode]?.color;
    if (modeColors) {
      const colors = flattenColors(modeColors, '');
      const className = `.${mode.toLowerCase().replace(/\s+/g, '-')}-tokens`;
      // Generic function to remove consecutive duplicate segments from a dash-separated string
      function removeDuplicatePrefix(name) {
        const parts = name.split('-');
        const result = [parts[0]];
        for (let i = 1; i < parts.length; i++) {
          if (parts[i] !== parts[i - 1]) {
            result.push(parts[i]);
          }
        }
        // Remove 'state' prefix if present
        if (result[0] === 'state') {
          result.shift();
        }
        // Remove duplicate pictogram prefix (e.g. pictogram-surface-pictogram-base => surface-pictogram-base)
        if (result[0] === 'pictogram' && result[1] === 'surface' && result[2] === 'pictogram') {
          result.shift(); // remove first 'pictogram'
        }
        return result.join('-');
      }

      const vars = Object.entries(colors)
        .map(([name, value]) => {
          // Remove mode prefix from variable name if present
          let unprefixed = name.replace(new RegExp(`^${mode.toLowerCase()}-`), '');
          // Remove consecutive duplicate segments generically
          unprefixed = removeDuplicatePrefix(unprefixed);
          // Remove 'alias' prefix from variable name
          if (unprefixed.startsWith('alias-')) {
            unprefixed = unprefixed.replace(/^alias-/, '');
          }
          // Remove references to 'alias' in variable values
          if (typeof value === 'string' && value.startsWith('{color.alias.')) {
            // e.g. {color.alias.text-body-Lm} => var(--text-body-lm)
            const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
            if (aliasMatch) {
              const [_, aliasName] = aliasMatch;
              return `  --${unprefixed}: var(--${aliasName.toLowerCase().replace(/\s+/g, '-')});`;
            }
          }
          if (typeof value === 'string' && value.startsWith('{color.')) {
            // Convert {color.x.y.z} to var(--x-y-z)
            const refMatch = value.match(/\{color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
            if (refMatch) {
              const [_, brand, color, shade] = refMatch;
              return `  --${unprefixed}: var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade});`;
            }
            // Handle {color.x.y} pattern
            const refMatch2 = value.match(/\{color\.([^.]+)\.([^.]+)\}/i);
            if (refMatch2) {
              const [_, brand, color] = refMatch2;
              return `  --${unprefixed}: var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')});`;
            }
            // Handle {color.x} pattern
            const refMatch3 = value.match(/\{color\.([^.]+)\}/i);
            if (refMatch3) {
              const [_, color] = refMatch3;
              return `  --${unprefixed}: var(--${color.toLowerCase().replace(/\s+/g, '-')});`;
            }
            // Otherwise output as is
            return `  --${unprefixed}: ${value};`;
          }
          return `  --${unprefixed}: ${value};`;
        })
        .join('\n');
      sharedBlocks.push(vars);
    }
  }
}

// Output shared variables to shared-styles.css
// const sharedOutputPath = path.resolve(__dirname, '../shared-styles.css');
// if (sharedBlocks.length > 0) {
//   fs.writeFileSync(sharedOutputPath, `@layer theme {\n  :root, :host {\n${sharedBlocks.join('\n\n')}\n  }\n}`);
// }

// // Output brand variables to theme-[brand].css
const brandOutputDir = path.resolve(__dirname, '../');
for (const brand in brandBlocks) {
  const brandFile = path.resolve(brandOutputDir, `theme-${brand.toLowerCase()}.css`);
  fs.writeFileSync(
    brandFile,
    `@custom-variant ${brand.toLowerCase()} (&:where([data-brand=${brand.toLowerCase()}], [data-brand=${brand.toLowerCase()}] *));\n\n@layer theme {\n  :root, :host {\n    [data-brand='${brand.toLowerCase()}'] {\n${brandBlocks[brand]}\n    }\n  }\n}`,
  );
}
