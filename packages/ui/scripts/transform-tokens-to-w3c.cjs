/* eslint-disable no-console */
const fs = require('fs/promises');
const StyleDictionary = require('style-dictionary').default;

/**
 * @typedef {import('design-tokens-format-module').JSONTokenTree} JSONTokenTree
 * @typedef {import('./design-tokens-root-type').DesignTokensRoot} DesignTokensRoot
 */

const tokens = require('./tokens.json');

const DIST_FOLDER = './dist';

/**
 * Prefixes token values with either "Primitives" or "Themes.<brandName>".
 * @param {object} tokenProps
 * @param {string} brandName
 * @returns {object}
 */
function addToTokenPropsValueASuffix(tokenProps, brandName) {
  const prefix = tokenProps.$collectionName === 'Primitives' ? 'Primitives' : `Themes.${brandName}`;

  return {
    ...tokenProps,
    $type: tokenProps.$type === 'float' ? 'dimension' : tokenProps.$type,
    $value: tokenProps.$value.replace('{', `{${prefix}.`),
  };
}

/**
 * Normalizes a collection of tokens by traversing nested groups.
 * @param {object} valueGroup
 * @param {string} brandName
 * @returns {object}
 */
function normalizeTokenGroup(valueGroup, brandName) {
  return Object.entries(valueGroup).reduce((acc, [tokenName, tokenValue]) => {
    if (tokenValue.$value) {
      acc[tokenName] = addToTokenPropsValueASuffix(tokenValue, brandName);
    } else {
      acc[tokenName] = Object.entries(tokenValue).reduce((innerAcc, [tintName, tintValue]) => {
        innerAcc[tintName] = addToTokenPropsValueASuffix(tintValue, brandName);
        return innerAcc;
      }, {});
    }
    return acc;
  }, {});
}

/**
 * Handles theme tokens for a given brand.
 * @param {object} brandModes
 * @param {string} brandName
 * @returns {object}
 */
function processThemeModes(brandModes, brandName) {
  return Object.entries(brandModes).reduce((acc, [propGroupName, categories]) => {
    acc[propGroupName] = Object.entries(categories).reduce((categoryAcc, [categoryName, tokens]) => {
      categoryAcc[categoryName] = normalizeTokenGroup(tokens, brandName);
      return categoryAcc;
    }, {});
    return acc;
  }, {});
}

/**
 * Handles "Tokens" section for all brands.
 * @param {object} tokenSection
 * @param {string[]} brands
 * @returns {object}
 */
function processTokensSection(tokenSection, brands) {
  return brands.reduce((acc, brandName) => {
    acc[brandName] = Object.entries(tokenSection.modes).reduce((modeAcc, [modeName, groups]) => {
      const normalizedMode = modeName.replace(/\s+/g, '-').toLowerCase();
      modeAcc[normalizedMode] = Object.entries(groups).reduce((groupAcc, [propGroupName, categories]) => {
        groupAcc[propGroupName] = Object.entries(categories).reduce((catAcc, [categoryName, tokens]) => {
          catAcc[categoryName] = Object.entries(tokens).reduce((tokenAcc, [tokenName, tokenValue]) => {
            tokenAcc[tokenName] = addToTokenPropsValueASuffix(tokenValue, brandName);
            return tokenAcc;
          }, {});
          return catAcc;
        }, {});
        return groupAcc;
      }, {});
      return modeAcc;
    }, {});
    return acc;
  }, {});
}

/**
 * Merges all token definitions into a final resolved tree.
 * @returns {object}
 */
function mergeTokens() {
  const brands = Object.keys(tokens.find(token => token.Themes).Themes.modes);

  return tokens.reduce((acc, current) => {
    if (current.Primitives) {
      acc.Primitives = { ...current.Primitives.modes['Mode 1'] };
    }
    if (current.Themes) {
      acc.Themes = Object.entries(current.Themes.modes).reduce((themesAcc, [brandName, brandModes]) => {
        themesAcc[brandName] = processThemeModes(brandModes, brandName);
        return themesAcc;
      }, {});
    }
    if (current.Tokens) {
      acc.Tokens = processTokensSection(current.Tokens, brands);
    }
    return acc;
  }, {});
}

/**
 * Saves JSON data to a file.
 * @param {string} filename
 * @param {object} data
 */
async function saveJSONToFile(filename, data) {
  try {
    const json = JSON.stringify(data, null, 2);
    await fs.writeFile(filename, json, 'utf-8');
    console.log(`✅ JSON saved to ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to save JSON to file:`, error);
  }
}

/**
 * Ensures a folder exists.
 * @param {string} folderPath
 */
async function createFolder(folderPath) {
  try {
    await fs.mkdir(folderPath, { recursive: true });
    console.log(`📂 Folder created: ${folderPath}`);
  } catch (error) {
    console.error('❌ Error creating folder:', error);
  }
}

const BRANDS_KEYS = [
  {
    themeName: 'Westpac',
    primitiveName: 'WBC',
  },
  {
    themeName: 'StGeorge',
    primitiveName: 'STG',
  },
];

function separateValuesPerBrand(themeName, primitiveName, tokens) {
  return {
    Primitives: {
      ...tokens.Primitives,
      color: { Reserved: tokens.Primitives.color.Reserved, [primitiveName]: tokens.Primitives.color[primitiveName] },
    },
    Tokens: {
      ...tokens.Tokens[themeName],
    },
    Themes: {
      [themeName]: tokens.Themes[themeName],
    },
  };
}

const STYLE_DICTIONARY_CONFIG = {
  source: [`${DIST_FOLDER}/w3c-tokens/ALL_BRANDS.json`],
  platforms: {
    css: {
      transforms: ['size/pxToRem'],
      transformGroup: 'css',
      files: [
        {
          destination: 'dist/style-dictionary/AllBrands/css/vars.css',
          format: ['css/variables'],
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    android: {
      transforms: ['size/pxToRem', 'attribute/cti', 'name/kebab', 'color/hex', 'size/remToSp', 'size/remToDp'],
      buildPath: 'dist/style-dictionary/AllBrands/android/',
      files: [
        {
          destination: 'style_dictionary_colors.xml',
          format: 'android/colors',
        },
        {
          destination: 'style_dictionary_dimensions.xml',
          format: 'android/dimens',
        },
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
      ],
      buildPath: 'dist/style-dictionary/AllBrands/ios/',
      files: [
        {
          destination: 'style_dictionary_colors.swift',
          format: 'ios-swift/class.swift',
        },
      ],
    },
  },
};

(async () => {
  await createFolder(`${DIST_FOLDER}/w3c-tokens`);
  const mergedTokens = mergeTokens();
  await saveJSONToFile(`${DIST_FOLDER}/w3c-tokens/ALL_BRANDS.json`, mergedTokens);
  const myStyleDictionary = new StyleDictionary({
    ...STYLE_DICTIONARY_CONFIG,
  });
  await myStyleDictionary.buildAllPlatforms();

  for (const { themeName, primitiveName } of BRANDS_KEYS) {
    const brandTokens = separateValuesPerBrand(themeName, primitiveName, mergedTokens);
    await saveJSONToFile(`${DIST_FOLDER}/w3c-tokens/${primitiveName}.json`, brandTokens);
    const myStyleDictionary = new StyleDictionary({
      source: [`${DIST_FOLDER}/w3c-tokens/${primitiveName}.json`],
      platforms: {
        css: {
          ...STYLE_DICTIONARY_CONFIG.platforms.css,
          files: [
            {
              destination: `dist/style-dictionary/${primitiveName}/css/style.css`,
              format: ['css/variables'],
              options: {
                outputReferences: true,
              },
            },
          ],
        },
        android: {
          ...STYLE_DICTIONARY_CONFIG.platforms.android,
          buildPath: `dist/style-dictionary/${primitiveName}/android/`,
        },
        ios: {
          ...STYLE_DICTIONARY_CONFIG.platforms.ios,
          buildPath: `dist/style-dictionary/${primitiveName}/ios/`,
          files: [
            {
              destination: 'style_dictionary_colors.swift',
              format: 'ios-swift/class.swift',
            },
          ],
        },
      },
    });
    await myStyleDictionary.buildAllPlatforms();
  }
})();
