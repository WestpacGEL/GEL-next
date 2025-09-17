/* eslint-disable no-console */
const fs = require('fs/promises');
const StyleDictionary = require('style-dictionary').default;

/**
 * @typedef {import('design-tokens-format-module').JSONTokenTree} JSONTokenTree
 * @typedef {import('./design-tokens-root-type').DesignTokensRoot} DesignTokensRoot
 */

const tokens = require('../tokens/figma-tokens.json');

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
  platforms: {
    css: {
      transforms: ['size/pxToRem'],
      transformGroup: 'css',
      files: [
        {
          destination: 'dist/style-dictionary/AllBrands/css/vars.css',
          format: ['css/variables'],
          options: { outputReferences: true },
        },
      ],
    },
    android: {
      transforms: ['size/pxToRem', 'attribute/cti', 'name/kebab', 'color/hex', 'size/remToSp', 'size/remToDp'],
      buildPath: 'dist/style-dictionary/AllBrands/android/',
      files: [
        { destination: 'style_dictionary_colors.xml', format: 'android/colors' },
        { destination: 'style_dictionary_dimensions.xml', format: 'android/dimens' },
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
      files: [{ destination: 'style_dictionary_colors.swift', format: 'ios-swift/class.swift' }],
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
      source: [brandFile],
      platforms: {
        css: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.css,
          files: [
            {
              destination: `dist/style-dictionary/${primitiveName}/css/style.css`,
              format: ['css/variables'],
              options: { outputReferences: true },
            },
          ],
        },
        android: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.android,
          buildPath: `dist/style-dictionary/${primitiveName}/android/`,
        },
        ios: {
          ...STYLE_DICTIONARY_BASE_CONFIG.platforms.ios,
          buildPath: `dist/style-dictionary/${primitiveName}/ios/`,
          files: [{ destination: 'style_dictionary_colors.swift', format: 'ios-swift/class.swift' }],
        },
      },
    });

    await brandDictionary.buildAllPlatforms();
  }
})();
