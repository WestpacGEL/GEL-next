/* eslint-disable no-console */
const fs = require('fs-extra');
const StyleDictionary = require('style-dictionary').default;

const BRANDS = require(`${__dirname}/../../src/constants/brands.json`);

// ==============================
// Helpers
// ==============================

function splitByUppercase(str) {
  return str.split(/(?=[A-Z])/);
}

function pascalToCamel(str) {
  return `${str[0].toLocaleLowerCase()}${str.slice(1)}`;
}

function pascalToKebab(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // Add hyphen between lower/number → Upper
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2') // Handle consecutive capitals correctly
    .replaceAll(' ', '-')
    .toLowerCase();
}

function kebabToCamel(str) {
  return str
    .split('-') // split on dashes
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1).toLowerCase();
      }
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
    .replaceAll(' ', '-')
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
const TOKEN_MODES = ['light-mode', 'dark-mode'];

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

    const tokensPerBrandAndMode = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)))
      .reduce((acc, current) => {
        const mode = TOKEN_MODES.find(mode => current.path.includes(mode));
        const [splitBrand, tokenName] = current.name.split(`-${mode}-`);
        const brand = brands?.[splitBrand.replace('tokens-', '')] || splitBrand.replace('tokens-', '');
        const selector = `[data-brand="${brand}"]${mode === 'dark-mode' ? '[data-theme="dark"]' : ''}`;
        const kebabCasedValue = camelToKebab(current.original.$value.replace('{', '').replace('}', ''))
          .split('.')
          .join('-');
        const finalTokenValue = `var(--${kebabCasedValue})`;
        const tokenNamePieces = tokenName.split('-');
        tokenNamePieces.splice(1, 1);
        return {
          ...acc,
          [selector]: [
            ...(acc[selector] || []),
            {
              ...current,
              name: tokenNamePieces.join('-'),
              $value: removePrefixes(finalTokenValue, PREFIXES_TO_REMOVE_PRIMITIVES),
            },
          ],
        };
      }, {});

    let output = '';
    output += '/**\n';
    output += ' * Do not edit directly, this file was auto-generated.\n';
    output += ' */\n\n';

    if (primitiveTokens.length) {
      output += ':root, :host {\n';
      primitiveTokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    }

    // Light is the default; dark requires an explicit attribute on the brand scope.
    Object.entries(tokensPerBrandAndMode).forEach(([selector, tokens]) => {
      output += `${selector} {\n`;
      tokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
      });
      output += '}\n\n';
    });
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

    const semanticTokens = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)))
      .map(current => {
        const mode = TOKEN_MODES.find(mode => current.path.includes(mode));
        const [, tokenName] = current.name.split(`-${mode}-`);
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

    for (const mode of TOKEN_MODES) {
      const tokens = semanticTokens.filter(token => token.path.includes(mode));
      if (!tokens.length) continue;
      const selector = `[data-brand="${options.brand}"]${mode === 'dark-mode' ? '[data-theme="dark"]' : ''}`;
      output += `${selector} {\n`;
      tokens.forEach(token => {
        const description = token.original.$description;
        output += `  --${token.name}: ${token.$value};${description ? ` /* ${description} */` : ''}\n`;
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
  ...StyleDictionary.hooks.transforms['color/hex8android'],
  name: 'color/hex-android',
  transform: (token, config, options) => {
    const argb = StyleDictionary.hooks.transforms['color/hex8android'].transform(token, config, options);
    // Android accepts six-digit RGB for opaque colours; only retain alpha when needed.
    return argb.startsWith('#ff') ? `#${argb.slice(3)}` : argb;
  },
});

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

function generateNameForIOSOrAndroid(str) {
  return kebabToCamel(
    splitByUppercase(str.replace('{', '').replace('}', '').replaceAll('.', '-').replaceAll(' ', '-')).join('-'),
  ).replace('Color', '');
}

StyleDictionary.registerFormat({
  name: 'ios/enum-colors',
  format: function ({ dictionary, options: { enumName } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(t => !(t.path.includes('light-mode') || t.path.includes('dark-mode')) && t.$type === 'color')
      .map(token => {
        return {
          ...token,
          name: generateNameForIOSOrAndroid(token.key),
        };
      });

    const semanticTokens = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)) && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOSOrAndroid(current.key);
        if (enumName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split(/LightMode|DarkMode/);
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(0, 1);
          tokenName = tokenNamePieces.join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = tokenNamePieces.join('').replace('tokens', '');
        }
        return {
          ...current,
          name: pascalToCamel(tokenName),
        };
      });

    const primitiveColorEnum = `${enumName}PrimitivesColors`;
    let output = '';
    output += `// Do not edit directly, this file was auto-generated.\n\n`;
    output += `import UIKit\n\n`;

    if (enumName === 'AllBrands') {
      output += `public enum ${primitiveColorEnum} {\n`;
      primitiveTokens.forEach(primitiveToken => {
        output += `  public static let ${primitiveToken.name} = ${primitiveToken.$value}\n`;
      });
      output += '}\n';

      output += '\n\n';
    }

    for (const mode of TOKEN_MODES) {
      const modeName = mode === 'light-mode' ? 'Light' : 'Dark';
      output += `public enum ${enumName}${modeName}Colors {\n`;
      semanticTokens
        .filter(token => token.path.includes(mode))
        .forEach(token => {
          output += `  public static let ${token.name} = ${token.$value}\n`;
        });
      output += '}\n\n\n';
    }

    if (enumName === 'AllBrands') {
      return output;
    }

    output += '\n\n';
    output += `public enum ${enumName}Colors {\n`;
    const lightTokens = semanticTokens.filter(token => token.path.includes('light-mode'));
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

StyleDictionary.registerFormat({
  name: 'ios/enum-dimensions',
  format: function ({ dictionary, options: { enumName } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(
        t =>
          !(t.path.includes('light-mode') || t.path.includes('dark-mode')) &&
          (t.$type === 'float' || t.$type === 'dimension'),
      )
      .map(token => {
        return {
          ...token,
          name: generateNameForIOSOrAndroid(token.key),
        };
      });

    const semanticTokens = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)) && (t.$type === 'float' || t.$type === 'dimension'))
      .map(current => {
        let tokenName = generateNameForIOSOrAndroid(current.key);
        if (enumName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split(/LightMode|DarkMode/);
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(1, 1);
          tokenName = tokenNamePieces.join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = tokenNamePieces.join('').replace('Tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    let output = '';
    output += `// Do not edit directly, this file was auto-generated.\n\n`;
    output += `import UIKit \n\n`;

    if (enumName === 'AllBrands') {
      output += `public enum ${enumName}PrimitivesDimension {\n`;
      primitiveTokens.forEach(primitiveToken => {
        output += `  public static let ${primitiveToken.name} = ${primitiveToken.$value}\n`;
      });
      output += '}\n';

      output += '\n\n';
    }

    for (const mode of TOKEN_MODES) {
      const modeName = mode === 'light-mode' ? 'Light' : 'Dark';
      output += `public enum ${enumName}${modeName}Dimensions {\n`;
      semanticTokens
        .filter(token => token.path.includes(mode))
        .forEach(token => {
          output += `  public static let ${token.name} = ${token.$value}\n`;
        });
      output += '}\n\n\n';
    }

    if (enumName === 'AllBrands') {
      return output;
    }

    output += '\n\n';
    output += `public enum ${enumName}Dimensions {\n\n`;
    const lightTokens = semanticTokens.filter(token => token.path.includes('light-mode'));
    lightTokens.forEach(lightToken => {
      output += `  public static var ${lightToken.name}: Double {\n`;
      output += `    switch UIScreen.main.traitCollection.userInterfaceStyle {\n`;
      output += `    case .dark:\n`;
      output += `      return Double(${enumName}DarkDimensions.${lightToken.name})\n`;
      output += `    default:\n`;
      output += `      return Double(${enumName}LightDimensions.${lightToken.name})\n`;
      output += `    }\n`;
      output += `  }\n\n`;
    });
    output += '}\n';

    return output;
  },
});

StyleDictionary.registerFormat({
  name: 'android/colors-custom',
  format: function ({ dictionary, options: { brandName } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(t => !(t.path.includes('light-mode') || t.path.includes('dark-mode')) && t.$type === 'color')
      .map(token => {
        return {
          ...token,
          name: generateNameForIOSOrAndroid(token.key),
        };
      });

    const semanticTokens = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)) && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOSOrAndroid(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split(/LightMode|DarkMode/);
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(0, 1);
          tokenName = [brandName, ...tokenNamePieces].join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = [brandName, ...tokenNamePieces].join('').replace('Tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    const primitiveDimensionEnum = `${brandName}PrimitivesDimension`;
    let output = '';
    output += '<?xml version="1.0" encoding="UTF-8"?>\n\n';
    output += '<!--\n';
    output += '  Do not edit directly, this file was auto-generated.\n';
    output += '-->\n';
    output += '<resources>\n';

    if (brandName === 'AllBrands') {
      output += `public enum ${primitiveDimensionEnum} {\n`;
      primitiveTokens.forEach(primitiveToken => {
        output += `  public static let ${primitiveToken.name} = ${primitiveToken.$value}\n`;
      });
      output += '}\n';

      output += '\n\n';
    }

    // The destination's filter selects one mode, with the same resource names in values and values-night.
    semanticTokens.forEach(token => {
      output += `  <color name="${token.name}">${token.$value}</color>\n`;
    });

    output += '</resources>\n';
    return output;
  },
});

StyleDictionary.registerFormat({
  name: 'android/dimens-custom',
  format: function ({ dictionary, options: { brandName } }) {
    const primitiveTokens = dictionary.allTokens
      .filter(
        t =>
          !(t.path.includes('light-mode') || t.path.includes('dark-mode')) &&
          (t.$type === 'float' || t.$type === 'dimension'),
      )
      .map(token => {
        return {
          ...token,
          name: generateNameForIOSOrAndroid(token.key),
        };
      });

    const semanticTokens = dictionary.allTokens
      .filter(t => TOKEN_MODES.some(mode => t.path.includes(mode)) && (t.$type === 'float' || t.$type === 'dimension'))
      .map(current => {
        let tokenName = generateNameForIOSOrAndroid(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split(/LightMode|DarkMode/);
          const tokenNamePieces = splitByUppercase(splittedTokenName);
          tokenNamePieces.splice(1, 1);
          tokenName = [brandName, ...tokenNamePieces].join('');
        } else {
          const tokenNamePieces = splitByUppercase(tokenName);
          tokenNamePieces.splice(4, 1);
          tokenName = [brandName, ...tokenNamePieces].join('').replace('Tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    let output = '';
    output += '<?xml version="1.0" encoding="UTF-8"?>\n\n';
    output += '<!--\n';
    output += '  Do not edit directly, this file was auto-generated.\n';
    output += '-->\n';
    output += '<resources>\n';

    if (brandName === 'AllBrands') {
      primitiveTokens.forEach(primitiveToken => {
        output += `  <dimen name="${primitiveToken.name}">${primitiveToken.$value.toString().replace('dp', '')}dp</dimen>\n`;
      });
    }

    semanticTokens.forEach(token => {
      output += `  <dimen name="${token.name}">${token.$value.toString().replace('dp', '')}dp</dimen>\n`;
    });

    output += '</resources>\n';
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
      'tokens',
      'ColorBackground',
      'ColorSurface',
      'ColorText',
      'ColorBorder',
      'ColorData',
      'ColorState',
      'ColorAlias',
      'ColorPictogram',
      'ColorSurface',
      'ColorReserved',
      'Color',
      'themes',
    ];
    // token.value will be resolved and transformed at this point
    const filteredString = prefixesToRemove.reduce((name, prefix) => name.replace(prefix, ''), token.name);
    return pascalToCamel(filteredString);
  },
});

StyleDictionary.registerTransform({
  type: 'name',
  transitive: true,
  name: `strip-android-css-dark-or-light-prefix`,
  transform: token => {
    const prefixesToRemove = ['darkMode', 'lightMode'];
    // token.value will be resolved and transformed at this point
    const filteredString = prefixesToRemove.reduce((name, prefix) => name.replace(prefix, ''), token.name);
    return pascalToCamel(filteredString);
  },
});

// ==============================
// Constants
// ==============================

const SRC_FOLDER = './src/tokens';

const BRANDS_KEBAB_CASE = BRANDS.reduce((acc, { themeName, brandCode }) => {
  return {
    ...acc,
    [pascalToKebab(themeName)]: brandCode,
  };
}, {});

const STYLE_DICTIONARY_BASE_CONFIG = {
  source: [`${SRC_FOLDER}/w3c/all-brands.json`],
  log: {
    warnings: 'disabled',
    verbosity: 'default',
  },
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
      'light-mode-and-dimension': token => {
        return token.path?.includes('light-mode') && (token.$type === 'float' || token.$type === 'dimension');
      },
    },
  },
  platforms: {
    css: {
      transforms: ['size/pxToRem'],
      transformGroup: 'css',
      files: [
        {
          destination: `${SRC_FOLDER}/css/all-brands/vars.css`,
          format: ['css/mode-wrapped-all-brands'],
          options: { brands: BRANDS_KEBAB_CASE },
        },
      ],
    },
    android: {
      transforms: [
        'size/pxToRem',
        'attribute/cti',
        'name/camel',
        'color/hex-android',
        'size/remToSp',
        'size/remToDp',
        'strip-android-prefix',
      ],
      files: [
        { destination: `${SRC_FOLDER}/android/all-brands/all-colors.xml`, format: 'android/colors' },
        {
          destination: `${SRC_FOLDER}/android/all-brands/all-dimensions.xml`,
          format: 'android/dimens',
        },
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
      files: [
        {
          destination: `${SRC_FOLDER}/ios/all-brands/all-colors.swift`,
          format: 'ios/enum-colors',
          options: { enumName: 'AllBrands' },
        },
        {
          destination: `${SRC_FOLDER}/ios/all-brands/all-dimensions.swift`,
          format: 'ios/enum-dimensions',
          options: { enumName: 'AllBrands' },
        },
      ],
    },
  },
};

// ==============================
// Helpers
// ==============================

/**
 * Prefixes token values with "Primitives" only if they don't already have it.
 */
function applyValuePrefix(tokenProps, brandName) {
  if (!tokenProps || !tokenProps.$value) {
    console.warn('Invalid token props:', tokenProps);
    return tokenProps;
  }

  const valueStr = tokenProps.$value;

  // Skip prefixing if value already has Primitives prefix
  let updatedValue = valueStr;
  if (valueStr.includes('{') && !valueStr.includes('{Primitives.')) {
    updatedValue = valueStr.replace(/\{/g, '{Primitives.');
  }

  return {
    ...tokenProps,
    $type: tokenProps.$type === 'float' ? 'dimension' : tokenProps.$type,
    $value: updatedValue,
  };
}

/**
 * Processes the "Tokens" section for all brands.
 */
function processTokensSection(tokenSection, brands) {
  // New structure: tokenSection.modes = { 'Light mode': {...}, 'Dark mode': {...} }
  // We need to convert this to brand-based structure for compatibility
  const result = {};

  brands.forEach(brand => {
    const themeName = brand.themeName;
    const primitiveName = brand.primitiveName;

    result[themeName] = {};

    Object.entries(tokenSection.modes).forEach(([modeName, groups]) => {
      const normalizedMode = modeName.replace(/\s+/g, '-').toLowerCase();

      result[themeName][normalizedMode] = Object.fromEntries(
        // Skip "misc" group as they are figma related tokens
        Object.entries(groups)
          .filter(([propGroup]) => propGroup !== 'misc')
          .map(([propGroup, categories]) => [
            propGroup,
            Object.fromEntries(
              Object.entries(categories).map(([categoryName, tokens]) => [
                categoryName,
                Object.fromEntries(
                  Object.entries(tokens).map(([tokenName, tokenValue]) => [
                    tokenName,
                    applyValuePrefix(tokenValue, primitiveName),
                  ]),
                ),
              ]),
            ),
          ]),
      );
    });
  });

  return result;
}

/**
 * Merges all token definitions into a resolved token tree.
 */
function mergeTokens(tokens) {
  const result = { Tokens: {} };

  return tokens.reduce((acc, current) => {
    if (current.Primitives) {
      // Primitives are directly accessible without modes wrapper
      acc.Primitives = { ...current.Primitives };
    }
    if (current.Tokens && current.Tokens.modes) {
      // New consolidated structure: all brands are under modes
      // Extract each brand from the consolidated structure
      Object.entries(current.Tokens.modes).forEach(([brandName, brandModes]) => {
        // Convert from brandName back to the brand token structure expected by existing logic
        const tokenSection = {
          modes: {
            'Light mode': brandModes['light-mode'] || {},
            'Dark mode': brandModes['dark-mode'] || {},
          },
        };

        // Select the brand by collection name rather than inferring it from token aliases.
        const brand = BRANDS.find(({ themeName }) => themeName === brandName);
        if (!brand) return;
        const processedTokens = processTokensSection(tokenSection, [brand]);

        // Merge the processed tokens into the accumulator
        Object.keys(processedTokens).forEach(brandKey => {
          acc.Tokens[brandKey] = processedTokens[brandKey];
        });
      });
    }
    return acc;
  }, result);
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
      border: tokens.Primitives.border, // Include all border primitives (shared across brands)
      color: {
        mono: tokens.Primitives.color.mono, // Include shared mono colors
        reserved: tokens.Primitives.color.reserved, // Include shared reserved colors
        [primitiveName]: tokens.Primitives.color[primitiveName],
      },
    },
    Tokens: tokens.Tokens[themeName],
  };
}

// ==============================
// Main
// ==============================
const LOG_CONFIG = {
  warnings: 'disabled', // 'warn' | 'error' | 'disabled'
  verbosity: 'default', // 'default' | 'silent' | 'verbose'
};

(async () => {
  await ensureFolderExists(`${SRC_FOLDER}/w3c`);

  // Read pre-transformed GEL tokens format
  console.log('🔄 Reading GEL tokens from file...');
  const tokens = await fs.readJson(`${SRC_FOLDER}/GEL-tokens-figma.json`);
  console.log('✅ Loaded tokens from GEL-tokens-figma.json\n');

  const mergedTokens = mergeTokens(tokens);
  await saveJSON(`${SRC_FOLDER}/w3c/all-brands.json`, mergedTokens);

  // Build all brands
  const baseDictionary = new StyleDictionary(STYLE_DICTIONARY_BASE_CONFIG);
  await baseDictionary.buildAllPlatforms();

  // Build per brand
  for (const { themeName, primitiveName, brandCode: brandName } of BRANDS) {
    const brandTokens = extractBrandTokens(themeName, primitiveName, mergedTokens);
    const brandFile = `${SRC_FOLDER}/w3c/${brandName}.json`;

    await saveJSON(brandFile, brandTokens);

    const brandDictionary = new StyleDictionary({
      ...STYLE_DICTIONARY_BASE_CONFIG,
      source: [brandFile],
      platforms: {
        css: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.css,
          files: [
            {
              destination: `${SRC_FOLDER}/css/${brandName}/style.css`,
              format: ['css/mode-wrapped-all-brands'],
              options: { outputReferences: true, brands: BRANDS_KEBAB_CASE },
            },
          ],
        },
        ios: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.ios,
          files: [
            {
              destination: `${SRC_FOLDER}/ios/${brandName}/${brandName}-colors.swift`,
              format: 'ios/enum-colors',
              options: { enumName: brandName.toUpperCase() },
            },
            {
              destination: `${SRC_FOLDER}/ios/${brandName}/${brandName}-dimensions.swift`,
              format: 'ios/enum-dimensions',
              options: { enumName: brandName.toUpperCase() },
            },
          ],
        },
      },
      log: LOG_CONFIG,
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
              destination: `${SRC_FOLDER}/css/${brandName}/style.css`,
              format: ['css/mode-wrapped-single-brand'],
              options: { brand: brandName.toLowerCase() },
            },
          ],
        },
        android: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.android,
          transforms: [
            'size/pxToRem',
            'attribute/cti',
            'name/camel',
            'color/hex-android',
            'size/remToSp',
            'size/remToDp',
            'strip-android-prefix',
            'strip-android-css-dark-or-light-prefix',
          ],
          files: [
            {
              destination: `${SRC_FOLDER}/android/${brandName}/values/${brandName}_colors.xml`,
              format: 'android/colors-custom',
              options: { brandName },
              filter: 'light-mode',
            },
            {
              destination: `${SRC_FOLDER}/android/${brandName}/values-night/${brandName}_colors.xml`,
              format: 'android/colors-custom',
              options: { brandName },
              filter: 'dark-mode',
            },
            {
              destination: `${SRC_FOLDER}/android/${brandName}/values/${brandName}_dimens.xml`,
              format: 'android/dimens-custom',
              options: { brandName },
              filter: 'light-mode',
            },
            {
              destination: `${SRC_FOLDER}/android/${brandName}/values-night/${brandName}_dimens.xml`,
              format: 'android/dimens-custom',
              options: { brandName },
              filter: 'dark-mode',
            },
          ],
        },
      },
      log: LOG_CONFIG,
    });

    await lightAndDarkModeDictionary.buildAllPlatforms();
  }
})();
