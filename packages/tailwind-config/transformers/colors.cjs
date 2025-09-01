/*
TO DO
- rename into functions the make sense lol
- convert from cjs?
- document the hell out of this
*/
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

const tokensPath = path.resolve(__dirname, '../tokens/figma-tokens.json');
const outputPath = path.resolve(__dirname, '../tokens/primitive-colors.css');

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'));

const themeTemplatePath = path.resolve(__dirname, '../templates/theme.handlebars');
const themeTemplateSource = fs.readFileSync(themeTemplatePath, 'utf8');
const sharedStylesTemplatePath = path.resolve(__dirname, '../templates/shared-styles.handlebars');
const sharedStylesTemplateSource = fs.readFileSync(sharedStylesTemplatePath, 'utf8');

const themeTemplate = Handlebars.compile(themeTemplateSource);
const sharedStylesTemplate = Handlebars.compile(sharedStylesTemplateSource);

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

const cssBlocks = [];

// rename these
const colorsObj = {};
const tokensObj = {};

const brandNameMap = {
  westpac: 'wbc',
  stgeorge: 'stg',
};

// Primitives
// might have to update for reserved case when needed to use in actual tailwind css? i.e. bg-reserved-etc?
const primitives = tokens.find(t => t.Primitives)?.Primitives?.modes?.['Mode 1']?.color;
if (primitives) {
  for (const parentKey in primitives) {
    const colors = flattenColors(primitives[parentKey], parentKey.toLowerCase());
    // const className = `.${parentKey.toLowerCase()}`;
    // const vars = Object.entries(colors).map(([name, value]) => `--${name}: ${value};`);
    // .join('\n');
    colorsObj[parentKey.toLowerCase()] = colorsObj[parentKey.toLowerCase()] || {};
    colorsObj[parentKey.toLowerCase()].primitives = colors;
    // primitiveColors[parentKey.toLowerCase()] = colors;
    // cssBlocks.push(`${className} {\n${vars}\n}`);
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
      // themeColorsObj[brandNameMap[brand.toLowerCase()]] = cleanedColors;
      colorsObj[brandNameMap[brand.toLowerCase()]] = colorsObj[brandNameMap[brand.toLowerCase()]] || {};
      colorsObj[brandNameMap[brand.toLowerCase()]].theme = cleanedColors;
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

      // tokensObj[mode.toLowerCase().split(' ')[0]] = tokensObj[mode.toLowerCase().split(' ')[0]] || {};
      tokensObj[mode.toLowerCase().split(' ')[0]] = tokenObj;
    }
  }
}
// if (tokensBlock) {
//   for (const mode in tokensBlock) {
//     const modeColors = tokensBlock[mode]?.color;
//     if (modeColors) {
//       const colors = flattenColors(modeColors, '');
//       const className = `.${mode.toLowerCase().replace(/\s+/g, '-')}-tokens`;
//       // Generic function to remove consecutive duplicate segments from a dash-separated string
//       function removeDuplicatePrefix(name) {
//         const parts = name.split('-');
//         const result = [parts[0]];
//         for (let i = 1; i < parts.length; i++) {
//           if (parts[i] !== parts[i - 1]) {
//             result.push(parts[i]);
//           }
//         }
//         // Remove 'state' prefix if present
//         if (result[0] === 'state') {
//           result.shift();
//         }
//         // Remove duplicate pictogram prefix (e.g. pictogram-surface-pictogram-base => surface-pictogram-base)
//         if (result[0] === 'pictogram' && result[1] === 'surface' && result[2] === 'pictogram') {
//           result.shift(); // remove first 'pictogram'
//         }
//         return result.join('-');
//       }

//       const vars = Object.entries(colors)
//         .map(([name, value]) => {
//           // Remove mode prefix from variable name if present
//           let unprefixed = name.replace(new RegExp(`^${mode.toLowerCase()}-`), '');
//           // Remove consecutive duplicate segments generically
//           unprefixed = removeDuplicatePrefix(unprefixed);
//           // Remove 'alias' prefix from variable name
//           if (unprefixed.startsWith('alias-')) {
//             unprefixed = unprefixed.replace(/^alias-/, '');
//           }
//           // Remove references to 'alias' in variable values
//           if (typeof value === 'string' && value.startsWith('{color.alias.')) {
//             // e.g. {color.alias.text-body-Lm} => var(--text-body-lm)
//             const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
//             if (aliasMatch) {
//               const [_, aliasName] = aliasMatch;
//               return `  --${unprefixed}: var(--${aliasName.toLowerCase().replace(/\s+/g, '-')});`;
//             }
//           }
//           if (typeof value === 'string' && value.startsWith('{color.')) {
//             // Convert {color.x.y.z} to var(--x-y-z)
//             const refMatch = value.match(/\{color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
//             if (refMatch) {
//               const [_, brand, color, shade] = refMatch;
//               return `  --${unprefixed}: var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade});`;
//             }
//             // Handle {color.x.y} pattern
//             const refMatch2 = value.match(/\{color\.([^.]+)\.([^.]+)\}/i);
//             if (refMatch2) {
//               const [_, brand, color] = refMatch2;
//               return `  --${unprefixed}: var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')});`;
//             }
//             // Handle {color.x} pattern
//             const refMatch3 = value.match(/\{color\.([^.]+)\}/i);
//             if (refMatch3) {
//               const [_, color] = refMatch3;
//               return `  --${unprefixed}: var(--${color.toLowerCase().replace(/\s+/g, '-')});`;
//             }
//             // Otherwise output as is
//             return `  --${unprefixed}: ${value};`;
//           }
//           return `  --${unprefixed}: ${value};`;
//         })
//         .join('\n');
//       cssBlocks.push(`${className} {\n${vars}\n}`);
//     }
//   }
// }

// console.log(
//   themeTemplate({
//     brand: 'wbc',
//     primitiveColors: primitiveColors['wbc'],
//     themeColors: themeColorsObj['wbc'],
//   }),
// );
// console.log(JSON.stringify(primitiveColors));
// console.log(JSON.stringify(tokensObj));
// fs.writeFileSync(outputPath, cssBlocks.join('\n\n'));
// console.log(`Primitive, theme, and token color CSS written to ${outputPath}`);

const brandOutputDir = path.resolve(__dirname, '../themes');
['wbc', 'stg'].forEach(brand => {
  const brandFile = path.resolve(brandOutputDir, `theme-${brand}.css`);
  fs.writeFileSync(
    brandFile,
    themeTemplate({
      brand,
      primitiveColors: colorsObj[brand]?.primitives || {},
      themeColors: colorsObj[brand]?.theme || {},
    }),
  );
});

const sharedOutputFile = path.resolve(__dirname, '../shared-styles.css');
fs.writeFileSync(
  sharedOutputFile,
  sharedStylesTemplate({
    light: tokensObj.light || {},
    dark: tokensObj.dark || {},
  }),
);
