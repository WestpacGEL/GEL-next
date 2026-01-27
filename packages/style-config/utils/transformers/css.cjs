const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const BRANDS = require(path.resolve(__dirname, '../../src/constants/brands.json'));

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
  let match = ref.match(/\{color\.([^.]+)\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, brand, color, shade] = match;
    return `var(--${brand.toLowerCase()}-${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }
  match = ref.match(/\{color\.([^.]+)\.([^.]+)\}/i);
  if (match) {
    const [_, color, shade] = match;
    return `var(--${color.toLowerCase().replace(/\s+/g, '-')}-${shade})`;
  }
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
      if (typeof value === 'string') {
        value = value.replace(/border-radius/g, 'rounded');
      }
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

function extractThemes(tokens, brandNameMap) {
  const themes = tokens.find(t => t.Themes)?.Themes?.modes;
  const colorsObj = {};
  if (themes) {
    for (const brand in themes) {
      const themeColors = themes[brand]?.color;
      if (themeColors) {
        const colors = flattenColors(themeColors, brand.toLowerCase());
        const cleanedColors = {};
        for (const name in colors) {
          let unprefixed = name.replace(new RegExp(`^${brand.toLowerCase()}-`), '');
          if (unprefixed.startsWith('alias-')) {
            unprefixed = unprefixed.replace(/^alias-/, '');
          }
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
  return colorsObj;
}

function getThemeBrandBorders(tokens, brandNameMap) {
  const themes = tokens.find(t => t.Themes)?.Themes?.modes;
  if (!themes) return {};
  const brandBorders = {};
  for (const brand in themes) {
    const borderRadii = themes[brand]?.border?.radius;
    if (borderRadii) {
      const cssVars = {};
      for (const key in borderRadii) {
        if (borderRadii[key]?.$value !== undefined) {
          const varName = `border-radius-${key.replace(/px$/, '').replace(/\s+/g, '-').toLowerCase()}`;
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
      brandBorders[brandNameMap[brand.toLowerCase()] || brand.toLowerCase()] = cssVars;
    }
  }
  return brandBorders;
}

function extractTokens(tokens) {
  const tokensBlock = tokens.find(t => t.Tokens)?.Tokens?.modes;
  const tokensObj = {};
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
  return tokensObj;
}

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
  return modeBorders;
}

// --------------------------------------------------------------------------
// Output Functions
// --------------------------------------------------------------------------
function writeBrandThemeCSS(tokens, brandNameMap, brandFontMap, themeTemplate, outputDir) {
  const themeColorsObj = extractThemes(tokens, brandNameMap);
  const primitivesObj = extractPrimitives(tokens);
  const themeBorderRadius = getThemeBrandBorders(tokens, brandNameMap);

  BRANDS.forEach(({ primitiveName }) => {
    const brand = primitiveName.toLowerCase();
    const brandFile = path.resolve(outputDir, `theme-${brand}.css`);
    
    // Merge brand-specific primitives with shared mono primitives
    const allPrimitives = {
      ...(primitivesObj.mono?.primitives || {}),
      ...(primitivesObj[brand]?.primitives || {})
    };
    
    fs.writeFileSync(
      brandFile,
      themeTemplate({
        brand,
        primitiveColors: allPrimitives,
        themeColors: themeColorsObj[brand]?.theme || {},
        borderRadius: themeBorderRadius[brand] || {},
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
      light: tokensObj.light || {},
      dark: tokensObj.dark || {},
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

  const brandNameMap = BRANDS.reduce((acc, { themeName, primitiveName }) => {
    return {
      ...acc,
      [themeName.toLowerCase()]: primitiveName.toLowerCase(),
    };
  }, {});

  const brandFontMap = BRANDS.reduce((acc, { fontName, primitiveName }) => {
    return {
      ...acc,
      [primitiveName.toLowerCase()]: fontName,
    };
  }, {});

  const colorsObj = extractPrimitives(tokens);
  const tokensObj = extractTokens(tokens);

  const brandOutputDir = path.resolve(__dirname, '../../src/css/themes');
  writeBrandThemeCSS(tokens, brandNameMap, brandFontMap, themeTemplate, brandOutputDir);

  const colorsOutputFile = path.resolve(__dirname, '../../src/css/shared/colors.css');
  writeSharedColorsCSS(colorsObj, tokensObj, sharedStylesTemplate, colorsOutputFile);

  const borderPrimitives = getBorderPrimitives(tokens);
  const modeBorderRadius = getModeBorders(tokens);
  const borderOutputFile = path.resolve(__dirname, '../../src/css/shared/borders.css');
  writeBordersCSS(borderPrimitives, modeBorderRadius, bordersTemplate, borderOutputFile);
}

transformCSS();
