const fs = require('fs/promises');

/**
 * @typedef {import('design-tokens-format-module').JSONTokenTree} JSONTokenTree
 * @typedef {import('./design-tokens-root-type').DesignTokensRoot} DesignTokensRoot
 */

const tokens = require('./tokens.json');

/**
 * Creates a design token object following W3C structure.
 * Adds description if available.
 */
const buildToken = token => {
  let $type = token.$type;
  let $value = token.$value;
  const jsonToken = {
    $type: $type,
    $value: $value,
  };
  if (token.$description) jsonToken.$description = token.$description;
  return jsonToken;
};

/**
 * Transforms the primitive-level design tokens
 * (i.e., color palettes and border primitives).
 *
 * @param {DesignTokensRoot} root
 * @returns {JSONTokenTree}
 */
function transformPrimitiveDesignTokens(root) {
  const colors = {};
  const borders = {};

  for (const [, mode] of Object.entries(root.Primitives.modes)) {
    // Traverse brand palettes (e.g., WBC, STG, Reserved)
    for (const [brand, brandColors] of Object.entries(mode.color)) {
      const colorEntries = {};

      // Traverse palette names (e.g., Blue, Green)
      for (const [palette, ramp] of Object.entries(brandColors)) {
        const paletteEntry = {};

        // Traverse levels (e.g., 100, 200)
        for (const [level, token] of Object.entries(ramp)) {
          paletteEntry[level] = buildToken(token);
        }

        colorEntries[palette] = paletteEntry;
      }

      colors[brand] = colorEntries;
    }

    // Traverse border properties (e.g., radius, width)
    for (const [borderProp, borderLevels] of Object.entries(mode.border)) {
      const borderEntry = {};

      for (const [level, token] of Object.entries(borderLevels)) {
        borderEntry[level] = buildToken(token);
      }

      borders[borderProp] = borderEntry;
    }
  }

  return {
    color: colors,
    border: borders,
  };
}

/**
 * Transforms mode-specific tokens (e.g., Light, Dark mode).
 * These typically define UI properties like screen background.
 *
 * @param {DesignTokensRoot} root
 * @returns {JSONTokenTree}
 */
function transformDesignTokens(root) {
  const modeEntry = {};

  for (const [modeName, mode] of Object.entries(root.Tokens.modes)) {
    const propEntry = {};

    // Traverse properties (e.g., color, border)
    for (const [propName, prop] of Object.entries(mode)) {
      const detailEntry = {};

      // Traverse detail groups (e.g., surface, screen)
      for (const [detailName, detail] of Object.entries(prop)) {
        const tokens = {};

        for (const [tokenName, token] of Object.entries(detail)) {
          tokens[tokenName] = buildToken(token);
        }

        detailEntry[detailName] = tokens;
      }

      propEntry[propName] = detailEntry;
    }

    modeEntry[modeName] = propEntry;
  }

  return modeEntry;
}

/**
 * Transforms theme-level brand tokens, including support
 * for `alias` and `reserved` categories within each brand.
 *
 * @param {DesignTokensRoot} root
 * @returns {JSONTokenTree}
 */
function transformThemesDesignTokens(root) {
  const themes = {};

  for (const [brand, brandData] of Object.entries(root.Themes.modes)) {
    const props = {};

    for (const [propName, prop] of Object.entries(brandData)) {
      const { alias, reserved, ...rest } = prop;
      const propDetails = {};

      // Resolve primary token groups
      for (const [detailName, detail] of Object.entries(rest)) {
        const entry = {};
        for (const [tokenName, token] of Object.entries(detail)) {
          entry[tokenName] = buildToken(token);
        }
        propDetails[detailName] = entry;
      }

      // Resolve `reserved` (e.g., success, warning) tokens
      if (reserved) {
        const reservedEntry = {};

        for (const [groupName, group] of Object.entries(reserved)) {
          const groupEntry = {};
          for (const [tokenName, token] of Object.entries(group)) {
            groupEntry[tokenName] = buildToken(token);
          }
          reservedEntry[groupName] = groupEntry;
        }

        propDetails.reserved = reservedEntry;
      }

      // Resolve `alias` tokens that reference other tokens
      if (alias) {
        const aliasEntry = {};

        for (const [tokenName, token] of Object.entries(alias)) {
          aliasEntry[tokenName] = buildToken(token);
        }

        propDetails.alias = aliasEntry;
      }

      props[propName] = propDetails;
    }

    themes[brand] = props;
  }

  return themes;
}

/**
 * Resolves token references like `{color.brand.primary.100}`
 * to their actual value by navigating the source object.
 */
function resolveReference(path, source) {
  const parts = path.replace(/[{}]/g, '').split('.');
  return parts.reduce((acc, key) => acc?.[key], source);
}

/**
 * Combines primitive, mode, and theme-level tokens to generate
 * a fully-resolved theme structure with references replaced.
 *
 * @param {JSONTokenTree} primaryTokens
 * @param {JSONTokenTree} modeTokens
 * @param {JSONTokenTree} themes
 * @returns {JSONTokenTree}
 */
function generateThemes(primaryTokens, modeTokens, themes) {
  const resolvedBrands = {};

  // First, resolve all brand-level themes
  for (const [brandName, brand] of Object.entries(themes)) {
    const propEntries = {};

    for (const [propName, prop] of Object.entries(brand)) {
      const { alias, reserved, ...details } = prop;
      const resolvedDetails = {};

      for (const [detailName, detail] of Object.entries(details)) {
        const tokens = {};

        for (const [tokenName, token] of Object.entries(detail)) {
          const resolved = resolveReference(token.$value, primaryTokens)?.$value;
          tokens[tokenName] = {
            ...token,
            $value: resolved ?? token.$value,
          };
        }

        resolvedDetails[detailName] = tokens;
      }

      if (reserved) {
        const reservedEntries = {};

        for (const [groupName, group] of Object.entries(reserved)) {
          const groupEntry = {};
          for (const [tokenName, token] of Object.entries(group)) {
            const resolved = resolveReference(token.$value, primaryTokens).$value;
            groupEntry[tokenName] = {
              ...token,
              $value: resolved ?? token.$value,
            };
          }
          reservedEntries[groupName] = groupEntry;
        }

        resolvedDetails.reserved = reservedEntries;
      }

      propEntries[propName] = resolvedDetails;

      if (alias) {
        const aliasEntries = {};

        for (const [tokenName, token] of Object.entries(alias)) {
          const resolved = resolveReference(token.$value, propEntries).$value;
          aliasEntries[tokenName] = {
            ...token,
            $value: resolved ?? 'SOMETHING WRONG',
          };
        }

        resolvedDetails.alias = aliasEntries;
      }
    }

    resolvedBrands[brandName] = propEntries;
  }

  // Then apply mode-specific overrides (e.g., Light/Dark)
  const finalThemes = {};

  for (const [brandName, brandTokens] of Object.entries(resolvedBrands)) {
    const modes = {};

    for (const [modeName, mode] of Object.entries(modeTokens)) {
      const props = {};

      for (const [propName, groups] of Object.entries(mode)) {
        const groupEntries = {};

        for (const [groupName, group] of Object.entries(groups)) {
          const tokens = {};

          for (const [tokenName, token] of Object.entries(group)) {
            const resolved = resolveReference(token.$value, brandTokens).$value;
            tokens[tokenName] = {
              ...token,
              $value: resolved ?? token.$value,
            };
          }

          groupEntries[groupName] = tokens;
        }

        props[propName] = groupEntries;
      }

      modes[modeName] = props;
    }

    finalThemes[brandName] = modes;
  }

  return finalThemes;
}

const flattenColorThemes = finalThemes => {
  const brands = {};
  for (const [brandKey, brand] of Object.entries(finalThemes)) {
    const modeEntry = {};
    for (const [modeName, mode] of Object.entries(brand)) {
      modeEntry[modeName] = { ...mode };
      const colorTokens = Object.values(mode.color).reduce((acc, current) => {
        return {
          ...acc,
          ...current,
        };
      }, {});
      modeEntry[modeName].color = colorTokens;
    }
    brands[brandKey] = modeEntry;
  }
  return brands;
};

// Transform raw token structure
const primaryTokens = transformPrimitiveDesignTokens(tokens[0]);
const modeTokens = transformDesignTokens(tokens[1]);
const themes = transformThemesDesignTokens(tokens[2]);

async function saveJSONToFile(filename, data) {
  try {
    const json = JSON.stringify(data, null, 2); // Pretty print with 2-space indent
    await fs.writeFile(filename, json, 'utf-8');
    console.log(`✅ JSON saved to ${filename}`);
  } catch (error) {
    console.error(`❌ Failed to save JSON to file:`, error);
  }
}

// Generate final resolved theme tree
const finalThemes = generateThemes(primaryTokens, modeTokens, themes);
Object.entries(finalThemes).forEach(([themeKey, theme]) => {
  saveJSONToFile(`./w3c-tokens/${themeKey}.json`, theme);
});

const flattenColorsFinalThemes = flattenColorThemes(finalThemes);
Object.entries(flattenColorsFinalThemes).forEach(([themeKey, theme]) => {
  saveJSONToFile(`./w3c-tokens/${themeKey}-flatten.json`, theme);
});
