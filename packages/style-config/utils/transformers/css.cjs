const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const BRANDS = require(path.resolve(__dirname, '../../src/constants/brands.json'));
const tokenModes = [
  'light-mode',
  // TODO: TEMPORARILY DISABLED - DARK MODE TOKENS TO BE INCLUDED IN FUTURE UPDATE
  // 'dark-mode'
];

// --------------------------------------------------------------------------
// Helpers
// --------------------------------------------------------------------------
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

function refToVar(ref) {
  // Handle new Primitives format: {Primitives.color.brand.palette.shade}
  let match = ref.match(/\{Primitives\.color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, brand, color, shade] = match;
    return `var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }

  // Handle border radius references: {Primitives.border.radius.value}
  match = ref.match(/\{Primitives\.border\.radius\.([^}]+)\}/i);
  if (match) {
    const [_, value] = match;
    return `var(--border-radius-${value.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()})`;
  }

  // Handle old format: {color.brand.palette.shade}
  match = ref.match(/\{color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, brand, color, shade] = match;
    return `var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }

  // Handle two-part color references: {color.palette.shade}
  match = ref.match(/\{color\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, color, shade] = match;
    return `var(--${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }

  // Handle single color references: {color.value}
  match = ref.match(/\{color\.([^.]+)\}/i);
  if (match) {
    const [_, color] = match;
    return `var(--${color.toLowerCase().replace(/\s+/g, '-')})`;
  }

  return ref;
}

function formatBorderRadius(obj) {
  const remapped = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/^rounded/, 'radius');
      if (newKey === 'radius-none' || newKey === 'radius-full') continue;
      let value = obj[key];
      remapped[newKey] = value;
    }
  }
  return remapped;
}

// --------------------------------------------------------------------------
// Extraction Functions
// --------------------------------------------------------------------------
function extractPrimitives(tokens) {
  const primitives = tokens.find(t => t.Primitives)?.Primitives?.color;
  const colorsObj = {};
  if (primitives) {
    for (const parentKey in primitives) {
      const colors = flattenColors(primitives[parentKey], parentKey.toLowerCase());
      colorsObj[parentKey.toLowerCase()] = colorsObj[parentKey.toLowerCase()] || {};
      colorsObj[parentKey.toLowerCase()].primitives = colors;
    }
  }
  return colorsObj;
}

function getBorderPrimitives(tokens) {
  const primitives = tokens.find(t => t.Primitives)?.Primitives?.border?.radius;
  if (!primitives) return {};
  const borderVars = {};
  for (const key in primitives) {
    if (primitives[key]?.$value !== undefined) {
      const varName = `border-radius-${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
      borderVars[varName] = `${primitives[key].$value}px`;
    }
  }
  return borderVars;
}

function extractTokens(tokens) {
  const tokensBlock = tokens.find(t => t.Tokens)?.Tokens?.modes;
  const tokensObj = {};

  if (tokensBlock) {
    // Check if this is the new consolidated structure (brand names as keys)
    const brandNames = Object.keys(tokensBlock);
    const isConsolidatedStructure = brandNames.some(name =>
      ['Westpac', 'StGeorge', 'Bank SA', 'Bank of Melbourne'].includes(name),
    );

    if (isConsolidatedStructure) {
      // New consolidated structure: extract from first brand (Westpac) as reference
      const westpacTokens = tokensBlock['Westpac'];

      if (westpacTokens) {
        tokenModes.forEach(modeKey => {
          const modeColors = westpacTokens[modeKey]?.color;
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
              let unprefixed = removeDuplicatePrefix(name);
              if (unprefixed.startsWith('alias-')) {
                unprefixed = unprefixed.replace(/^alias-/, '');
              }
              if (typeof value === 'string' && value.startsWith('{color.alias.')) {
                const aliasMatch = value.match(/\{color\.alias\.([^.]+)\}/i);
                if (aliasMatch) {
                  const [_, aliasName] = aliasMatch;
                  value = `var(--${aliasName.toLowerCase().replace(/\s+/g, '-')})`;
                }
              } else if (
                typeof value === 'string' &&
                (value.startsWith('{color.') || value.startsWith('{Primitives.'))
              ) {
                value = refToVar(value);
              }
              tokenObj[unprefixed] = value;
            });

            const processedMode = modeKey === 'light-mode' ? 'light' : 'dark';
            tokensObj[processedMode] = tokenObj;
          }
        });
      }
    } else {
      // Old structure: process as before
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
            } else if (typeof value === 'string' && (value.startsWith('{color.') || value.startsWith('{Primitives.'))) {
              value = refToVar(value);
            }
            tokenObj[unprefixed] = value;
          });

          const processedMode = mode.toLowerCase().split(' ')[0];
          tokensObj[processedMode] = tokenObj;
        }
      }
    }
  }
  return tokensObj;
}

function getModeBorders(tokens) {
  const modes = tokens.find(t => t.Tokens)?.Tokens?.modes;
  if (!modes) return {};

  const modeBorders = {};

  // Check if this is the new consolidated structure
  const brandNames = Object.keys(modes);
  const isConsolidatedStructure = brandNames.some(name =>
    ['Westpac', 'StGeorge', 'Bank SA', 'Bank of Melbourne'].includes(name),
  );

  if (isConsolidatedStructure) {
    // New consolidated structure: extract from first brand (Westpac) as reference
    const westpacTokens = modes['Westpac'];
    if (westpacTokens) {
      tokenModes.forEach(modeKey => {
        const borderRadii = westpacTokens[modeKey]?.border?.radius;
        if (borderRadii) {
          const cssVars = {};
          for (const key in borderRadii) {
            if (borderRadii[key]?.$value !== undefined) {
              const varName = `${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
              let value = borderRadii[key].$value;
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
          const outputModeKey = modeKey === 'light-mode' ? 'light' : 'dark';
          modeBorders[outputModeKey] = cssVars;
        }
      });
    }
  } else {
    // Old structure: process as before
    for (const modeName in modes) {
      const borderRadii = modes[modeName]?.border?.radius;
      if (borderRadii) {
        const cssVars = {};
        for (const key in borderRadii) {
          if (borderRadii[key]?.$value !== undefined) {
            const varName = `${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
            let value = borderRadii[key].$value;
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
        const modeKey = modeName.toLowerCase().includes('dark') ? 'dark' : 'light';
        modeBorders[modeKey] = cssVars;
      }
    }
  }

  return modeBorders;
}

// --------------------------------------------------------------------------
// Output Functions
// --------------------------------------------------------------------------
function writeBrandThemeCSS(tokens, brandFontMap, themeTemplate, outputDir) {
  const primitivesObj = extractPrimitives(tokens);
  const borderPrimitives = getBorderPrimitives(tokens);

  // Check if this is the new consolidated structure
  const modes = tokens.find(t => t.Tokens)?.Tokens?.modes;
  const isConsolidatedStructure =
    modes && Object.keys(modes).some(name => ['Westpac', 'StGeorge', 'Bank SA', 'Bank of Melbourne'].includes(name));

  BRANDS.forEach(({ primitiveName, themeName }) => {
    const brand = primitiveName.toLowerCase();
    const brandFile = path.resolve(outputDir, `theme-${brand}.css`);

    // Merge brand-specific primitives with shared mono primitives
    const allPrimitives = {
      ...(primitivesObj.mono?.primitives || {}),
      ...(primitivesObj[brand]?.primitives || {}),
    };

    let brandLightSemanticTokens = {};
    let brandDarkSemanticTokens = {};

    if (isConsolidatedStructure && modes) {
      // New consolidated structure: extract brand-specific tokens directly
      const brandTokens = modes[themeName];
      if (brandTokens) {
        // Extract light mode semantic tokens
        if (brandTokens['light-mode']?.color) {
          const colors = flattenColors(brandTokens['light-mode'].color, '');
          Object.entries(colors).forEach(([name, value]) => {
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

            let unprefixed = removeDuplicatePrefix(name);
            if (unprefixed.startsWith('alias-')) {
              unprefixed = unprefixed.replace(/^alias-/, '');
            }
            if (typeof value === 'string' && (value.startsWith('{color.') || value.startsWith('{Primitives.'))) {
              value = refToVar(value);
            }
            brandLightSemanticTokens[unprefixed] = value;
          });
        }

        // TODO: TEMPORARILY DISABLED - DARK MODE TOKENS TO BE INCLUDED IN FUTURE UPDATE
        // Extract dark mode semantic tokens
        // if (brandTokens['dark-mode']?.color) {
        //   const colors = flattenColors(brandTokens['dark-mode'].color, '');
        //   Object.entries(colors).forEach(([name, value]) => {
        //     function removeDuplicatePrefix(name) {
        //       const parts = name.split('-');
        //       const result = [parts[0]];
        //       for (let i = 1; i < parts.length; i++) {
        //         if (parts[i] !== parts[i - 1]) {
        //           result.push(parts[i]);
        //         }
        //       }
        //       if (result[0] === 'state') result.shift();
        //       if (result[0] === 'pictogram' && result[1] === 'surface' && result[2] === 'pictogram') result.shift();
        //       return result.join('-');
        //     }

        //     let unprefixed = removeDuplicatePrefix(name);
        //     if (unprefixed.startsWith('alias-')) {
        //       unprefixed = unprefixed.replace(/^alias-/, '');
        //     }
        //     if (typeof value === 'string' && (value.startsWith('{color.') || value.startsWith('{Primitives.'))) {
        //       value = refToVar(value);
        //     }
        //     brandDarkSemanticTokens[unprefixed] = value;
        //   });
        // }
      }
    } else {
      // Fallback to old behavior for non-consolidated structure
      const tokensObj = extractTokens(tokens);

      // Process light mode tokens
      if (tokensObj.light) {
        Object.entries(tokensObj.light).forEach(([key, value]) => {
          if (typeof value === 'string' && value.includes('--wbc-')) {
            // Replace WBC references with current brand (e.g., --wbc-muted-100 -> --stg-muted-100)
            brandLightSemanticTokens[key] = value.replace(/--wbc-/g, `--${brand}-`);
          } else {
            brandLightSemanticTokens[key] = value;
          }
        });
      }

      // Process dark mode tokens
      if (tokensObj.dark) {
        Object.entries(tokensObj.dark).forEach(([key, value]) => {
          if (typeof value === 'string' && value.includes('--wbc-')) {
            // Replace WBC references with current brand (e.g., --wbc-muted-100 -> --stg-muted-100)
            brandDarkSemanticTokens[key] = value.replace(/--wbc-/g, `--${brand}-`);
          } else {
            brandDarkSemanticTokens[key] = value;
          }
        });
      }
    }

    fs.writeFileSync(
      brandFile,
      themeTemplate({
        brand,
        primitiveColors: allPrimitives,
        lightSemanticTokens: brandLightSemanticTokens,
        darkSemanticTokens: brandDarkSemanticTokens,
        borderRadius: borderPrimitives,
        fontFamily: brandFontMap[brand] || '',
      }),
    );
  });
}

function writeSharedColorsCSS(colorsObj, tokensObj, sharedStylesTemplate, outputFile) {
  fs.writeFileSync(
    outputFile,
    sharedStylesTemplate({
      reserved: colorsObj.reserved?.primitives || {},
      // Tailwind theme variables - using light tokens for reference
      tailwindTokens: tokensObj.light || {},
    }),
  );
}

function writeBordersCSS(borderPrimitives, modeBorderRadius, bordersTemplate, outputFile) {
  const borderCss = bordersTemplate({
    borders: borderPrimitives,
    light: modeBorderRadius.light || {},
    dark: modeBorderRadius.dark || {},
    radius: formatBorderRadius(modeBorderRadius.light || {}),
  });
  fs.writeFileSync(outputFile, borderCss);
}

// --------------------------------------------------------------------------
// Main Transformer Function
// --------------------------------------------------------------------------
function transformCSS() {
  const gelTokensPath = path.resolve(__dirname, '../../src/tokens/GEL-tokens-figma.json');
  const tokens = JSON.parse(fs.readFileSync(gelTokensPath, 'utf8'));

  const themeTemplatePath = path.resolve(__dirname, '../templates/theme.handlebars');
  const themeTemplateSource = fs.readFileSync(themeTemplatePath, 'utf8');
  const sharedStylesTemplatePath = path.resolve(__dirname, '../templates/colors.handlebars');
  const sharedStylesTemplateSource = fs.readFileSync(sharedStylesTemplatePath, 'utf8');
  const bordersTemplatePath = path.resolve(__dirname, '../templates/borders.handlebars');
  const bordersTemplateSource = fs.readFileSync(bordersTemplatePath, 'utf8');

  const themeTemplate = Handlebars.compile(themeTemplateSource);
  const sharedStylesTemplate = Handlebars.compile(sharedStylesTemplateSource);
  const bordersTemplate = Handlebars.compile(bordersTemplateSource);

  const brandFontMap = BRANDS.reduce((acc, { fontName, primitiveName }) => {
    return {
      ...acc,
      [primitiveName.toLowerCase()]: fontName,
    };
  }, {});

  const colorsObj = extractPrimitives(tokens);
  const tokensObj = extractTokens(tokens);

  const brandOutputDir = path.resolve(__dirname, '../../src/css/themes');
  writeBrandThemeCSS(tokens, brandFontMap, themeTemplate, brandOutputDir);

  const colorsOutputFile = path.resolve(__dirname, '../../src/css/shared/colors.css');
  writeSharedColorsCSS(colorsObj, tokensObj, sharedStylesTemplate, colorsOutputFile);

  const borderPrimitives = getBorderPrimitives(tokens);
  const modeBorderRadius = getModeBorders(tokens);
  const borderOutputFile = path.resolve(__dirname, '../../src/css/shared/borders.css');
  writeBordersCSS(borderPrimitives, modeBorderRadius, bordersTemplate, borderOutputFile);
}

transformCSS();
