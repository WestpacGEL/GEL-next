/* eslint-disable no-console */
const fs = require('fs/promises');
const StyleDictionary = require('style-dictionary').default;

const tokens = require(`${__dirname}/../../src/tokens/GEL-tokens-figma.json`);

// ==============================
// Helpers
// ==============================

function splitByUppercase(str) {
  return str.split(/(?=[A-Z])/);
}

function kebabToPascal(str) {
  return str
    .split('-') // split on dashes
    .map((word, index) => {
      // uppercase first letter, lowercase the rest
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Converts a camelCase string into kebab-case
 * @param {string} str
 * @returns {string}
 */
function camelToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // insert dash before capital letters
    .toLowerCase(); // make everything lowercase
}

/**
 * @typedef {import('design-tokens-format-module').JSONTokenTree} JSONTokenTree
 * @typedef {import('./design-tokens-root-type').DesignTokensRoot} DesignTokensRoot
 */

/**
 * Remove prefixes
 * @param {string} tokenName
 * @param {string[]} prefixes
 * @returns {string}
 */
function removePrefixes(tokenName, prefixes) {
  return prefixes.reduce((name, prefix) => name.replace(prefix, ''), tokenName);
}
// ==============================
// Formats
// ==============================

const PREFIXES_TO_REMOVE_PRIMITIVES = ['-reserved', '-alias'];

StyleDictionary.registerFormat({
  name: 'css/mode-wrapped-all-brands',
  format: function ({ dictionary, options: { brands } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(t => !(t.name.indexOf('light-mode') !== -1 || t.name.indexOf('dark-mode') !== -1))
      .reduce((acc, current) => {
        const newToken = {
          ...current,
          name: removePrefixes(current.name, PREFIXES_TO_REMOVE_PRIMITIVES),
        };
        return [...acc, newToken];
      }, []);

    const lightTokensPerBrand = dictionary.allTokens
      .filter(t => t.name.indexOf('light-mode') !== -1)
      .reduce((acc, current) => {
        const [splitBrand, tokenName] = current.name.split('-light-mode-');
        const brand = brands?.[splitBrand.replace('tokens-', '')] || splitBrand.replace('tokens-', '');
        const kebabCasedValue = camelToKebab(current.original.$value.replace('{', '').replace('}', ''))
          .split('.')
          .join('-');
        const finalTokenValue = `var(--${kebabCasedValue})`;
        const tokenNamePieces = tokenName.split('-');
        tokenNamePieces.splice(1, 1);
        return {
          ...acc,
          [brand]: [
            ...(acc[brand] || []),
            {
              ...current,
              name: tokenNamePieces.join('-'),
              $value: removePrefixes(finalTokenValue, PREFIXES_TO_REMOVE_PRIMITIVES),
            },
          ],
        };
      }, {});

    const darkTokensPerBrand = dictionary.allTokens
      .filter(t => t.name.indexOf('dark-mode') !== -1)
      .reduce((acc, current) => {
        const [splitBrand, tokenName] = current.name.split('-dark-mode-');
        const brand = brands?.[splitBrand.replace('tokens-', '')] || splitBrand.replace('tokens-', '');
        const kebabCasedValue = camelToKebab(current.original.$value.replace('{', '').replace('}', ''))
          .split('.')
          .join('-');
        const finalTokenValue = `var(--${kebabCasedValue})`;
        const tokenNamePieces = tokenName.split('-');
        tokenNamePieces.splice(1, 1);
        return {
          ...acc,
          [brand]: [
            ...(acc[brand] || []),
            {
              ...current,
              name: tokenNamePieces.join('-'),
              $value: removePrefixes(finalTokenValue, PREFIXES_TO_REMOVE_PRIMITIVES),
            },
          ],
        };
      }, {});

    let output = '';

    if (primitiveTokens.length) {
      output += ':root, :host {\n';
      primitiveTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Light mode (default, wrapped in data-brand)
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
    const primitiveTokens = dictionary.allTokens
      .filter(t => !(t.name.indexOf('light-mode') !== -1 || t.name.indexOf('dark-mode') !== -1))
      .reduce((acc, current) => {
        const newToken = {
          ...current,
          name: removePrefixes(current.name, PREFIXES_TO_REMOVE_PRIMITIVES),
        };
        return [...acc, newToken];
      }, []);

    const lightTokens = dictionary.allTokens
      .filter(t => t.name.indexOf('light-mode') !== -1)
      .map(current => {
        const [, tokenName] = current.name.split('-light-mode-');
        const kebabCasedValue = camelToKebab(current.original.$value.replace('{', '').replace('}', ''))
          .split('.')
          .join('-');
        const finalTokenValue = `var(--${kebabCasedValue})`;
        const tokenNamePieces = tokenName.split('-');
        tokenNamePieces.splice(1, 1);
        return {
          ...current,
          name: tokenNamePieces.join('-'),
          $value: removePrefixes(finalTokenValue, PREFIXES_TO_REMOVE_PRIMITIVES),
        };
      });

    const darkTokens = dictionary.allTokens
      .filter(t => t.name.indexOf('dark-mode') !== -1)
      .map(current => {
        const [, tokenName] = current.name.split('-dark-mode-');
        const kebabCasedValue = camelToKebab(current.original.$value.replace('{', '').replace('}', ''))
          .split('.')
          .join('-');
        const finalTokenValue = `var(--${kebabCasedValue})`;
        const tokenNamePieces = tokenName.split('-');
        tokenNamePieces.splice(1, 1);
        return {
          ...current,
          name: tokenNamePieces.join('-'),
          $value: removePrefixes(finalTokenValue, PREFIXES_TO_REMOVE_PRIMITIVES),
        };
      });

    let output = '';

    if (primitiveTokens.length) {
      output += ':root, :host {\n';
      primitiveTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Light mode (wrapped in data-brand)
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

function generateNameForIOS(str) {
  return kebabToPascal(
    splitByUppercase(str.replace('{', '').replace('}', '').replaceAll('.', '-').replaceAll(' ', '-')).join('-'),
  ).replace('Color', '');
}

StyleDictionary.registerFormat({
  name: 'ios/enum',
  format: function ({ dictionary, options: { prefixToRemove, enumName } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(t => !(t.path.includes('light-mode') || t.path.includes('dark-mode')) && t.$type === 'color')
      .map(token => {
        return {
          ...token,
          name: generateNameForIOS(token.key),
        };
      });

    const lightTokens = dictionary.allTokens
      .filter(t => t.path.includes('light-mode') && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (enumName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('LightMode');
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(1, 1);
          tokenName = tokenNamePieces.join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = tokenNamePieces.join('').replace('tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    const darkTokens = dictionary.allTokens
      .filter(t => t.path.includes('dark-mode') && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (enumName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('DarkMode');
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(1, 1);
          tokenName = tokenNamePieces.join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = tokenNamePieces.join('').replace('tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    const primitiveColorEnum = `${enumName}PrimitivesColors`;
    let output = '';
    output += `// Do not edit directly, this file was auto-generated.\n\n`;
    output += `import UIKit\n\n`;
    output += `public enum ${primitiveColorEnum} {\n`;
    primitiveTokens.forEach(primitiveToken => {
      output += `  public static let ${primitiveToken.name} = ${primitiveToken.$value}\n`;
    });
    output += '}\n';

    output += '\n\n';

    output += `public enum ${enumName}LightColors {\n`;
    lightTokens.forEach(lightToken => {
      output += `  public static let ${lightToken.name} = ${primitiveColorEnum}.${generateNameForIOS(lightToken.original.$value)}\n`;
    });
    output += '}\n';

    output += '\n\n';

    output += `public enum ${enumName}DarkColors {\n`;
    darkTokens.forEach(darkToken => {
      output += `  public static let ${darkToken.name} = ${primitiveColorEnum}.${generateNameForIOS(darkToken.original.$value)}\n`;
    });
    output += '}\n';

    if (enumName === 'AllBrands') {
      return output;
    }

    output += '\n\n';
    output += `public enum ${enumName}Colors {\n`;
    lightTokens.forEach(lightToken => {
      output += `  public static var ${lightToken.name}: UIColor {\n`;
      output += `    return UIColor { traitCollection in\n`;
      output += `      switch traitCollection.userInterfaceStyle {\n`;
      output += `        case .dark:\n`;
      output += `          return ${enumName}DarkColors.${lightToken.name}\n`;
      output += `        default:\n`;
      output += `          return ${enumName}LightColors.${lightToken.name}\n`;
      output += `      }\n`;
      output += `    }\n`;
      output += `  }\n`;
    });
    output += '}\n';

    return output;
  },
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-android-prefix`,
  transform: token => {
    if (token.path[0] === 'Primitives' && token.path[1] === 'color') {
      return token.name.replace('primitives-color', 'primitives');
    }
    const prefixesToRemove = [
      'tokens_',
      '_color_background',
      '_color_surface',
      '_color_text',
      '_color_border',
      '_color_data',
      '_color_state',
      '_color_alias',
      '_color_pictogram',
      '_color_surface',
      '_color_reserved',
      '_color',
      'themes_',
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
    const prefixesToRemove = ['dark_mode_', 'light_mode_'];
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
      transforms: ['size/pxToRem'],
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
        'name/snake',
        'color/hex',
        'size/remToSp',
        'size/remToDp',
        'strip-android-prefix',
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
        'color/UIColorSwift',
        'content/swift/literal',
        'asset/swift/literal',
        'size/swift/remToCGFloat',
      ],
      buildPath: `${DIST_FOLDER}/style-dictionary/AllBrands/ios/`,
      files: [{ destination: 'all-colors.swift', format: 'ios/enum', options: { enumName: 'AllBrands' } }],
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
              options: { outputReferences: true, brands: { 'st-george': 'stg', westpac: 'wbc' } },
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
          files: [{ destination: 'all-colors.swift', format: 'ios/enum', options: { enumName: primitiveName } }],
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
            'name/snake',
            'color/hex',
            'size/remToSp',
            'size/remToDp',
            'strip-android-prefix',
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
