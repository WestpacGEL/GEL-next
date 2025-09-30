/* eslint-disable no-console */
const fs = require('fs/promises');
const StyleDictionary = require('style-dictionary').default;

/**
 * @typedef {import('design-tokens-format-module').JSONTokenTree} JSONTokenTree
 * @typedef {import('./design-tokens-root-type').DesignTokensRoot} DesignTokensRoot
 */

const tokens = require(`${__dirname}/../../src/tokens/GEL-tokens-figma.json`);

// ==============================
// Formats
// ==============================

StyleDictionary.registerFormat({
  name: 'css/mode-wrapped-all-brands',
  format: function ({ dictionary, options: { brands } }) {
    const primitiveTokens = dictionary.allTokens.filter(
      t => !(t.name.indexOf('light-mode') !== -1 || t.name.indexOf('dark-mode') !== -1),
    );
    const lightTokensPerBrand = dictionary.allTokens
      .filter(t => t.name.indexOf('light-mode') !== -1)
      .reduce((acc, current) => {
        const [splitBrand, tokenName] = current.name.split('-light-mode-');
        const brand = brands?.[splitBrand] || splitBrand;
        return {
          ...acc,
          [brand]: [...(acc[brand] || []), { ...current, name: tokenName }],
        };
      }, {});

    const darkTokensPerBrand = dictionary.allTokens
      .filter(t => t.name.indexOf('dark-mode') !== -1)
      .reduce((acc, current) => {
        const [splitBrand, tokenName] = current.name.split('-dark-mode-');
        const brand = brands?.[splitBrand] || splitBrand;
        return {
          ...acc,
          [brand]: [...(acc[brand] || []), { ...current, name: tokenName }],
        };
      }, {});

    let output = '';

    // Light mode (default, not wrapped)
    if (primitiveTokens.length) {
      output += ':root, :host {\n';
      primitiveTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Light mode (default, not wrapped)
    if (Object.entries(lightTokensPerBrand).length) {
      Object.entries(lightTokensPerBrand).forEach(([brand, tokens]) => {
        output += `[data-brand="${brand}"] {\n`;
        tokens.forEach(token => {
          const description = token.original.$description;
          output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
        });
        output += '}\n\n';
      });
    }

    // Dark mode (wrapped in selector)
    if (Object.entries(darkTokensPerBrand).length) {
      Object.entries(darkTokensPerBrand).forEach(([brand, tokens]) => {
        output += `[data-brand="${brand}"][data-mode="dark"] {\n`;
        tokens.forEach(token => {
          const description = token.original.$description;
          output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
        });
        output += '}\n\n';
      });
    }
    return output;
  },
});

StyleDictionary.registerFormat({
  name: 'css/mode-wrapped-single-brand',
  format: function ({ dictionary, options }) {
    const primitiveTokens = dictionary.allTokens.filter(
      t => !(t.name.indexOf('light-mode') !== -1 || t.name.indexOf('dark-mode') !== -1),
    );

    const lightTokens = dictionary.allTokens.filter(t => t.name.indexOf('light-mode') !== -1);

    const darkTokens = dictionary.allTokens.filter(t => t.name.indexOf('dark-mode') !== -1);

    let output = '';

    // Light mode (default, not wrapped)
    if (primitiveTokens.length) {
      output += ':root, :host {\n';
      primitiveTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Light mode (default, not wrapped)
    if (lightTokens.length) {
      output += `[data-brand="${options.brand}"] {\n`;
      lightTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name.replace('light-mode-', '')}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Dark mode (wrapped in selector)
    if (darkTokens.length) {
      output += `[data-brand="${options.brand}"][data-mode="dark"] {\n`;
      darkTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name.replace('dark-mode-', '')}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }
    return output;
  },
});

// ==============================
// Transforms
// ==============================

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-ios-prefix`,
  transform: token => {
    const prefixesToRemoveIOS = [
      'ColorBackground',
      'ColorSurface',
      'ColorText',
      'ColorBorder',
      'ColorData',
      'ColorState',
      'ColorAlias',
      'ColorPictogram',
      'ColorSurface',
      'ColorBackground',
      'ColorReserved',
      'Color',
      'themes',
      'tokens',
    ];

    return prefixesToRemoveIOS.reduce((name, prefix) => name.replace(prefix, ''), token.name);
  },
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-ios-dark-or-light-prefix`,
  transform: token => {
    const prefixesToRemoveIOS = ['DarkMode', 'LightMode'];

    return prefixesToRemoveIOS.reduce((name, prefix) => name.replace(prefix, ''), token.name);
  },
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-css-prefix`,
  transform: token => {
    if (token.path[0] === 'Primitives' && token.path[1] === 'color') {
      return token.name.replace('primitives-color', 'primitives');
    }
    const prefixesToRemove = [
      'tokens-',
      '-color-background',
      '-color-surface',
      '-color-text',
      '-color-border',
      '-color-data',
      '-color-state',
      '-color-alias',
      '-color-pictogram',
      '-color-surface',
      '-color-background',
      '-color-reserved',
      '-color',
      'themes-',
    ];
    // token.value will be resolved and transformed at this point
    return prefixesToRemove.reduce((name, prefix) => name.replace(prefix, ''), token.name);
  },
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-css-dark-or-light-prefix`,
  transform: token => {
    const prefixesToRemove = ['dark-mode-', 'light-mode-'];
    // token.value will be resolved and transformed at this point
    return prefixesToRemove.reduce((name, prefix) => name.replace(prefix, ''), token.name);
  },
});

// ==============================
// Constants
// ==============================

const DIST_FOLDER = './dist';

const BRANDS = [
  { themeName: 'Westpac', primitiveName: 'WBC' },
  { themeName: 'StGeorge', primitiveName: 'STG' },
];

const STYLE_DICTIONARY_BASE_CONFIG = {
  source: [`${DIST_FOLDER}/w3c-tokens/ALL_BRANDS.json`],
  hooks: {
    filters: {
      'light-mode': token => {
        return token.path?.includes('light-mode');
      },
      'dark-mode': token => {
        return token.path?.includes('dark-mode');
      },
      'light-mode-and-color': token => {
        return token.path?.includes('light-mode') && token.$type === 'color';
      },
      'dark-mode-and-color': token => {
        return token.path?.includes('dark-mode') && token.$type === 'color';
      },
      'light-mode-and-dimension': token => {
        return token.path?.includes('light-mode') && (token.$type === 'float' || token.$type === 'dimension');
      },
      'dark-mode-and-dimension': token => {
        return token.path?.includes('dark-mode') && (token.$type === 'float' || token.$type === 'dimension');
      },
    },
  },
  platforms: {
    css: {
      transforms: ['size/pxToRem', 'strip-css-prefix'],
      transformGroup: 'css',
      files: [
        {
          destination: `${DIST_FOLDER}/style-dictionary/AllBrands/css/vars.css`,
          format: ['css/mode-wrapped-all-brands'],
          options: { brands: { 'st-george': 'stg', westpac: 'wbc' } },
        },
      ],
    },
    android: {
      transforms: [
        'size/pxToRem',
        'attribute/cti',
        'name/kebab',
        'color/hex',
        'size/remToSp',
        'size/remToDp',
        'strip-css-prefix',
      ],
      buildPath: `${DIST_FOLDER}/style-dictionary/AllBrands/android/`,
      files: [
        { destination: 'all-colors.xml', format: 'android/colors' },
        { destination: 'all-dimensions.xml', format: 'android/dimens' },
      ],
    },
    ios: {
      transforms: [
        'size/pxToRem',
        'attribute/cti',
        'name/camel',
        'color/UIColorSwift',
        'content/swift/literal',
        'asset/swift/literal',
        'size/swift/remToCGFloat',
        'strip-ios-prefix',
      ],
      buildPath: `${DIST_FOLDER}/style-dictionary/AllBrands/ios/`,
      files: [
        { destination: 'all-colors.swift', format: 'ios-swift/class.swift', options: { outputReferences: true } },
      ],
    },
  },
};

// ==============================
// Helpers
// ==============================

/**
 * Prefixes token values with either "Primitives" or "Themes.<brandName>".
 */
function applyValuePrefix(tokenProps, brandName) {
  const prefix = tokenProps.$collectionName === 'Primitives' ? 'Primitives' : `Themes.${brandName}`;

  return {
    ...tokenProps,
    $type: tokenProps.$type === 'float' ? 'dimension' : tokenProps.$type,
    $value: tokenProps.$value.replace('{', `{${prefix}.`),
  };
}

/**
 * Normalizes a group of tokens by traversing nested groups.
 */
function normalizeTokenGroup(group, brandName) {
  return Object.entries(group).reduce((acc, [key, value]) => {
    if (value.$value) {
      acc[key] = applyValuePrefix(value, brandName);
    } else {
      acc[key] = Object.fromEntries(
        Object.entries(value).map(([innerKey, innerValue]) => [innerKey, applyValuePrefix(innerValue, brandName)]),
      );
    }
    return acc;
  }, {});
}

/**
 * Processes theme tokens for a given brand.
 */
function processThemeModes(brandModes, brandName) {
  return Object.fromEntries(
    Object.entries(brandModes).map(([propGroup, categories]) => [
      propGroup,
      Object.fromEntries(
        Object.entries(categories).map(([categoryName, tokens]) => [
          categoryName,
          normalizeTokenGroup(tokens, brandName),
        ]),
      ),
    ]),
  );
}

/**
 * Processes the "Tokens" section for all brands.
 */
function processTokensSection(tokenSection, brands) {
  return brands.reduce((acc, brandName) => {
    acc[brandName] = Object.fromEntries(
      Object.entries(tokenSection.modes).map(([modeName, groups]) => {
        const normalizedMode = modeName.replace(/\s+/g, '-').toLowerCase();
        return [
          normalizedMode,
          Object.fromEntries(
            Object.entries(groups).map(([propGroup, categories]) => [
              propGroup,
              Object.fromEntries(
                Object.entries(categories).map(([categoryName, tokens]) => [
                  categoryName,
                  Object.fromEntries(
                    Object.entries(tokens).map(([tokenName, tokenValue]) => [
                      tokenName,
                      applyValuePrefix(tokenValue, brandName),
                    ]),
                  ),
                ]),
              ),
            ]),
          ),
        ];
      }),
    );
    return acc;
  }, {});
}

/**
 * Merges all token definitions into a resolved token tree.
 */
function mergeTokens() {
  const brands = Object.keys(tokens.find(t => t.Themes).Themes.modes);

  return tokens.reduce((acc, current) => {
    if (current.Primitives) {
      acc.Primitives = { ...current.Primitives.modes['Mode 1'] };
    }
    if (current.Themes) {
      acc.Themes = Object.fromEntries(
        Object.entries(current.Themes.modes).map(([brandName, brandModes]) => [
          brandName,
          processThemeModes(brandModes, brandName),
        ]),
      );
    }
    if (current.Tokens) {
      acc.Tokens = processTokensSection(current.Tokens, brands);
    }
    return acc;
  }, {});
}

/**
 * Writes JSON data to a file.
 */
async function saveJSON(filename, data) {
  try {
    await fs.writeFile(filename, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`✅ Saved JSON: ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to save JSON (${filename}):`, error);
  }
}

/**
 * Ensures a folder exists (creates recursively if needed).
 */
async function ensureFolderExists(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(`📂 Folder ready: ${folderPath}`);
  } catch (error) {
    console.error(`❌ Failed to create folder (${folderPath}):`, error);
  }
}

/**
 * Creates a subset of tokens for a given brand.
 */
function extractBrandTokens(themeName, primitiveName, tokens) {
  return {
    Primitives: {
      ...tokens.Primitives,
      color: {
        Reserved: tokens.Primitives.color.Reserved,
        [primitiveName]: tokens.Primitives.color[primitiveName],
      },
    },
    Tokens: tokens.Tokens[themeName],
    Themes: { [themeName]: tokens.Themes[themeName] },
  };
}

// ==============================
// Main
// ==============================

(async () => {
  await ensureFolderExists(`${DIST_FOLDER}/w3c-tokens`);

  const mergedTokens = mergeTokens();
  await saveJSON(`${DIST_FOLDER}/w3c-tokens/ALL_BRANDS.json`, mergedTokens);

  // Build all brands
  const baseDictionary = new StyleDictionary(STYLE_DICTIONARY_BASE_CONFIG);
  await baseDictionary.buildAllPlatforms();

  // Build per brand
  for (const { themeName, primitiveName } of BRANDS) {
    const brandTokens = extractBrandTokens(themeName, primitiveName, mergedTokens);
    const brandFile = `${DIST_FOLDER}/w3c-tokens/${primitiveName}.json`;

    await saveJSON(brandFile, brandTokens);

    const brandDictionary = new StyleDictionary({
      ...STYLE_DICTIONARY_BASE_CONFIG,
      source: [brandFile],
      platforms: {
        css: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.css,
          files: [
            {
              destination: `${DIST_FOLDER}/style-dictionary/${primitiveName}/css/style.css`,
              format: ['css/mode-wrapped-all-brands'],
              options: { outputReferences: true },
            },
          ],
        },
        android: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.android,
          buildPath: `${DIST_FOLDER}/style-dictionary/${primitiveName}/android/`,
        },
        ios: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.ios,
          buildPath: `${DIST_FOLDER}/style-dictionary/${primitiveName}/ios/`,
        },
      },
      log: {
        warnings: 'warn', // 'warn' | 'error' | 'disabled'
        verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
      },
    });

    await brandDictionary.buildAllPlatforms();

    const lightAndDarkModeDictionary = new StyleDictionary({
      ...STYLE_DICTIONARY_BASE_CONFIG,
      source: [brandFile],
      platforms: {
        css: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.css,
          files: [
            {
              destination: `${DIST_FOLDER}/style-dictionary/${primitiveName}/css/style.css`,
              format: ['css/mode-wrapped-single-brand'],
              options: { brand: primitiveName.toLowerCase() },
            },
          ],
        },
        android: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.android,
          transforms: [
            'size/pxToRem',
            'attribute/cti',
            'name/kebab',
            'color/hex',
            'size/remToSp',
            'size/remToDp',
            'strip-css-prefix',
            'strip-css-dark-or-light-prefix',
          ],
          buildPath: `${DIST_FOLDER}/style-dictionary/${primitiveName}/android/`,
          files: [
            {
              destination: 'colors-light-mode.xml',
              format: 'android/colors',
              filter: 'light-mode',
            },
            {
              destination: 'colors-dark-mode.xml',
              format: 'android/colors',
              filter: 'dark-mode',
            },
            { destination: 'dimensions-light-mode.xml', format: 'android/dimens', filter: 'light-mode' },
            { destination: 'dimensions-dark-mode.xml', format: 'android/dimens', filter: 'dark-mode' },
          ],
        },
        ios: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.ios,
          transforms: [
            'size/pxToRem',
            'attribute/cti',
            'name/camel',
            'color/UIColorSwift',
            'content/swift/literal',
            'asset/swift/literal',
            'size/swift/remToCGFloat',
            'strip-ios-prefix',
            'strip-ios-dark-or-light-prefix',
          ],
          buildPath: `${DIST_FOLDER}/style-dictionary/${primitiveName}/ios/`,
          files: [
            {
              destination: 'colors-light-mode.swift',
              format: 'ios-swift/class.swift',
              filter: 'light-mode-and-color',
            },
            {
              destination: 'colors-dark-mode.xswift',
              format: 'ios-swift/class.swift',
              filter: 'dark-mode-and-color',
            },
            {
              destination: 'dimensions-light-mode.swift',
              format: 'ios-swift/class.swift',
              filter: 'light-mode-and-dimension',
            },
            {
              destination: 'dimensions-dark-mode.xswift',
              format: 'ios-swift/class.swift',
              filter: 'dark-mode-and-dimension',
            },
          ],
        },
      },
      log: {
        warnings: 'warn', // 'warn' | 'error' | 'disabled'
        verbosity: 'verbose', // 'default' | 'silent' | 'verbose'
      },
    });

    await lightAndDarkModeDictionary.buildAllPlatforms();
  }
})();
