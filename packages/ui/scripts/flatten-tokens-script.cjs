const fs = require('fs');
const path = require('path');

const tokens = require('./tokens.json');

// Get the colour primitives
const primitiveColors = tokens[0].Primitives.modes['Mode 1'];

/**
 * @returns object with keys named as an example 'color.Reserved.Blue.50'
 * this can be used to retrieve the values for themes/tokens
 */
const flattenObject = (obj, delimiter = '.', prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    // doesn't append $value to the key so it can be used with the reference values for themes/tokens
    const newKey = prefix ? `${prefix}${key === '$value' ? '' : delimiter}${key === '$value' ? '' : key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenObject(obj[key], delimiter, newKey));
    } else {
      // Will end once it reaches the $value key
      if (key === '$value') {
        // strips the {} off the themes $value as it is a reference, then can be used to get actual value
        acc[newKey] = obj[key].toString().replace(/\s*[{}]/g, '');
      }
    }
    return acc;
  }, {});
};

/**
 * @returns object with keys that are token names and reference values i.e. {'text-body': 'color.mono.white'}
 */
const flattenTokenObject = (obj, delimiter = '.', prefix = '') => {
  return Object.keys(obj).reduce((acc, key) => {
    // doesn't append $value to the key so it can be used with the reference values for themes/tokens
    const newKey = prefix ? `${prefix}${key === '$value' ? '' : delimiter}${key === '$value' ? '' : key}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenTokenObject(obj[key], delimiter, newKey));
    } else {
      // Will end once it reaches the $value key
      if (key === '$value') {
        // for current provided JSON the [1] position in the array should be the token name
        // strips the {} off the themes $value as it is a reference, then can be used to get actual value
        acc[newKey.split('.')[1]] = obj[key].toString().replace(/\s*[{}]/g, '');
      }
    }
    return acc;
  }, {});
};

const primitives = flattenObject(primitiveColors);
const themes = flattenObject(tokens[2].Themes.modes);

// reassigns keys in themes obj to actual values from primitives
Object.keys(themes).forEach(key => {
  const val = themes[key];
  if (key.includes('anomaly')) {
    // anomaly tokens need to know the current brand which is the first part of the key in current provided JSON
    const currBrand = key.split('.')[0];
    themes[key] = primitives[themes[`${currBrand}.${val}`]];
  } else if (themes[key].includes('#')) {
    // keeps the value if it is a hex value already and not a reference
    return;
  } else {
    themes[key] = primitives[val];
  }
});

const brands = Object.keys(tokens[2].Themes.modes);
const modes = Object.keys(tokens[1].Tokens.modes);

let flattenedTokens = {};

// creates final formatted json format of brand : { light: tokens, dark: tokens }
brands.forEach(brand => {
  let theme = {};
  modes.forEach(mode => {
    let type = {};
    Object.keys(tokens[1].Tokens.modes[mode]).forEach(key => {
      // colors can be combined into one object but other types will need to be broken up more i.e border: { radius: { tokenName: 'tokenVal' }}
      if (key !== 'color') {
        let subTheme = {};
        Object.keys(tokens[1].Tokens.modes[mode][key]).forEach(subKey => {
          const tokensWithMappedValues = flattenTokenObject(tokens[1].Tokens.modes[mode][key]);
          Object.keys(tokensWithMappedValues).forEach(token => {
            const themeKey = `${brand}.${tokensWithMappedValues[token]}`;
            tokensWithMappedValues[token] = themes[themeKey];
          });
          subTheme[subKey] = tokensWithMappedValues;
        });
        type[key] = subTheme;
      } else {
        const tokensWithMappedValues = flattenTokenObject(tokens[1].Tokens.modes[mode][key]);
        Object.keys(tokensWithMappedValues).forEach(token => {
          // needs to append brand to token to get correct value
          const themeKey = `${brand}.${tokensWithMappedValues[token]}`;
          tokensWithMappedValues[token] = themes[themeKey];
        });
        type[key] = tokensWithMappedValues;
      }
    });

    // use a different key name for light/dark mode
    const modeShort = mode.includes('Light') ? 'light' : 'dark';
    theme[modeShort] = type;
  });
  flattenedTokens[brand] = theme;
});

const outputPath = path.resolve(__dirname, '../flattened-tokens.json');

fs.writeFileSync(outputPath, JSON.stringify(flattenedTokens, null, 2));
