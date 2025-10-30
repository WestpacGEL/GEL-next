/* eslint-disable no-console */
const fs = require('fs-extra');
const StyleDictionary = require('style-dictionary').default;

const tokens = require(`${__dirname}/../../src/tokens/GEL-tokens-figma.json`);

// ==============================
// Helpers
// ==============================

function splitByUppercase(str) {
  return str.split(/(?=[A-Z])/);
}

function pascalToCamel(str) {
  return `${str[0].toLocaleLowerCase()}${str.slice(1)}`;
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
        output += `[data-brand="${brand}"][data-theme="dark"] {\n`;
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
      output += `[data-brand="${options.brand}"][data-theme="dark"] {\n`;
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
          name: pascalToCamel(tokenName),
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

    output += `public enum ${enumName}LightColors {\n`;
    lightTokens.forEach(lightToken => {
      // output += `  public static let ${lightToken.name} = ${primitiveColorEnum}.${generateNameForIOS(lightToken.original.$value)}\n`;
      output += `  public static let ${lightToken.name} = ${lightToken.$value}\n`;
    });
    output += '}\n';

    output += '\n\n';

    output += `public enum ${enumName}DarkColors {\n`;
    darkTokens.forEach(darkToken => {
      // output += `  public static let ${darkToken.name} = ${primitiveColorEnum}.${generateNameForIOS(darkToken.original.$value)}\n`;
      output += `  public static let ${darkToken.name} = ${darkToken.$value}\n`;
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
          name: generateNameForIOS(token.key),
        };
      });

    const lightTokens = dictionary.allTokens
      .filter(t => t.path.includes('light-mode') && (t.$type === 'float' || t.$type === 'dimension'))
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
          tokenName = tokenNamePieces.join('').replace('Tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    const darkTokens = dictionary.allTokens
      .filter(t => t.path.includes('dark-mode') && (t.$type === 'float' || t.$type === 'dimension'))
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
          tokenName = tokenNamePieces.join('').replace('Tokens', '');
        }
        return {
          ...current,
          name: tokenName,
        };
      });

    const primitiveDimensionEnum = `${enumName}PrimitivesDimension`;
    let output = '';
    output += `// Do not edit directly, this file was auto-generated.\n\n`;
    output += `import UIKit \n\n`;

    if (enumName === 'AllBrands') {
      output += `public enum ${primitiveDimensionEnum} {\n`;
      primitiveTokens.forEach(primitiveToken => {
        output += `  public static let ${primitiveToken.name} = ${primitiveToken.$value}\n`;
      });
      output += '}\n';

      output += '\n\n';
    }

    output += `public enum ${enumName}LightDimensions {\n`;
    lightTokens.forEach(lightToken => {
      // output += `  public static let ${lightToken.name} = ${primitiveDimensionEnum}.${generateNameForIOS(lightToken.original.$value)}\n`;
      output += `  public static let ${lightToken.name} = ${lightToken.$value}\n`;
    });
    output += '}\n';

    output += '\n\n';

    output += `public enum ${enumName}DarkDimensions {\n`;
    darkTokens.forEach(darkToken => {
      // output += `  public static let ${darkToken.name} = ${primitiveDimensionEnum}.${generateNameForIOS(darkToken.original.$value)}\n`;
      output += `  public static let ${darkToken.name} = ${darkToken.$value}\n`;
    });
    output += '}\n';

    if (enumName === 'AllBrands') {
      return output;
    }

    output += '\n\n';
    output += `public enum ${enumName}Dimensions {\n\n`;
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
          name: generateNameForIOS(token.key),
        };
      });

    const lightTokens = dictionary.allTokens
      .filter(t => t.path.includes('light-mode') && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('LightMode');
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

    const darkTokens = dictionary.allTokens
      .filter(t => t.path.includes('dark-mode') && t.$type === 'color')
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('DarkMode');
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

    lightTokens.forEach(lightToken => {
      output += `  <color name="${lightToken.name}">${lightToken.$value}</color>\n`;
    });

    darkTokens.forEach(darkToken => {
      output += `  <color name="${darkToken.name}">${darkToken.$value}</color>\n`;
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
          name: generateNameForIOS(token.key),
        };
      });

    const lightTokens = dictionary.allTokens
      .filter(t => t.path.includes('light-mode') && (t.$type === 'float' || t.$type === 'dimension'))
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('LightMode');
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

    const darkTokens = dictionary.allTokens
      .filter(t => t.path.includes('dark-mode') && (t.$type === 'float' || t.$type === 'dimension'))
      .map(current => {
        let tokenName = generateNameForIOS(current.key);
        if (brandName !== 'AllBrands') {
          let [, splittedTokenName] = tokenName.split('DarkMode');
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

    lightTokens.forEach(lightToken => {
      output += `  <dimen name="${lightToken.name}">${lightToken.$value.toString().replace('dp', '')}dp</dimen>\n`;
    });

    darkTokens.forEach(darkToken => {
      output += `  <dimen name="${darkToken.name}">${darkToken.$value.toString().replace('dp', '')}dp</dimen>\n`;
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

const DIST_FOLDER = './dist';
const SRC_FOLDER = './src/tokens';

const BRANDS = [
  { themeName: 'Westpac', primitiveName: 'WBC' },
  { themeName: 'StGeorge', primitiveName: 'STG' },
];

const STYLE_DICTIONARY_BASE_CONFIG = {
  source: [`${SRC_FOLDER}/w3c/ALL_BRANDS.json`],
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
          destination: `${SRC_FOLDER}/css/all-brands/vars.css`,
          format: ['css/mode-wrapped-all-brands'],
          options: { brands: { 'st-george': 'stg', westpac: 'wbc' } },
        },
      ],
    },
    android: {
      transforms: [
        'size/pxToRem',
        'attribute/cti',
        'name/camel',
        'color/hex',
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
/*
// TODO 
-  switch output to src folder only
- create pnpm script to copy to dist
- remove unnecessary scripts and pnpm scripts
  - transformers - w3c.cjs

Folder structure
- tokens
  - android
  - css
  - ios
  - w3c
*/
(async () => {
  const mergedTokens = mergeTokens();
  await saveJSON(`${SRC_FOLDER}/w3c/all_brands.json`, mergedTokens);

  // Build all brands
  const baseDictionary = new StyleDictionary(STYLE_DICTIONARY_BASE_CONFIG);
  await baseDictionary.buildAllPlatforms();

  // Build per brand
  for (const { themeName, primitiveName } of BRANDS) {
    const brandTokens = extractBrandTokens(themeName, primitiveName, mergedTokens);
    const brandName = primitiveName.toLowerCase();
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
              options: { outputReferences: true, brands: { 'st-george': 'stg', westpac: 'wbc' } },
            },
          ],
        },
        // Output for all colors
        // android: {
        //   ...STYLE_DICTIONARY_BASE_CONFIG.platforms.android,
        //   files: [
        //     {
        //       destination: `${DIST_FOLDER}/style-dictionary/android/${brandName}/all-colors.xml`,
        //       format: 'android/colors',
        //     },
        //     {
        //       destination: `${DIST_FOLDER}/style-dictionary/android/${brandName}/all-dimensions.xml`,
        //       format: 'android/dimens',
        //     },
        //   ],
        // },
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
            'color/hex',
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
          files: [
            // {
            //   destination: `${DIST_FOLDER}/style-dictionary/ios/${brandName}/colors-light-mode.swift`,
            //   format: 'ios-swift/class.swift',
            //   filter: 'light-mode-and-color',
            // },
            // {
            //   destination: `${DIST_FOLDER}/style-dictionary/ios/${brandName}/colors-dark-mode.xswift`,
            //   format: 'ios-swift/class.swift',
            //   filter: 'dark-mode-and-color',
            // },
            // {
            //   destination: `${DIST_FOLDER}/style-dictionary/ios/${brandName}/dimensions-light-mode.swift`,
            //   format: 'ios-swift/class.swift',
            //   filter: 'light-mode-and-dimension',
            // },
            // {
            //   destination: `${DIST_FOLDER}/style-dictionary/ios/${brandName}/dimensions-dark-mode.xswift`,
            //   format: 'ios-swift/class.swift',
            //   filter: 'dark-mode-and-dimension',
            // },
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
