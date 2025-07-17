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
    const newKeyString = key === '$value' ? '' : `${delimiter}${key}`;
    const newKey = prefix ? `${prefix}${newKeyString}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenObject(obj[key], delimiter, newKey));
    } else {
      // Will end once it reaches the $value key
      if (key === '$value') {
        // strips the {} off the themes $value as it is a reference, then can be used to get actual value
        // eslint-disable-next-line sonarjs/slow-regex
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
    const newKeyString = key === '$value' ? '' : `${delimiter}${key}`;
    const newKey = prefix ? `${prefix}${newKeyString}` : key;

    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      // Recursively flatten nested objects
      Object.assign(acc, flattenTokenObject(obj[key], delimiter, newKey));
    } else {
      // Will end once it reaches the $value key
      if (key === '$value') {
        // for current provided JSON the [1] position in the array should be the token name
        // strips the {} off the themes $value as it is a reference, then can be used to get actual value
        // eslint-disable-next-line sonarjs/slow-regex
        acc[newKey.split('.')[1]] = obj[key].toString().replace(/\s*[{}]/g, '');
      }
    }
    return acc;
  }, {});
};

const primitives = flattenObject(primitiveColors);
const themes = flattenObject(tokens[2].Themes.modes);
// console.log(themes);

// reassigns keys in themes obj to actual values from primitives
Object.keys(themes).forEach(key => {
  const val = themes[key];
  const currBrand = key.split('.')[0];

  if (key.includes('anomaly')) {
    if (val.includes('mono')) {
      themes[key] = themes[`${currBrand}.${val}`];
      return;
    }
    // anomaly tokens need to know the current brand which is the first part of the key in current provided JSON
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

const updateTokensWithMappedValues = (brand, tokensWithMappedValues, themes) => {
  Object.keys(tokensWithMappedValues).forEach(token => {
    const themeKey = `${brand}.${tokensWithMappedValues[token]}`;
    tokensWithMappedValues[token] = themes[themeKey];
  });
};

// creates final formatted json format of brand : { light: tokens, dark: tokens }
brands.forEach(brand => {
  let tempModeObj = {};
  modes.forEach(mode => {
    let tempTypeObj = {};
    // type = border, color etc.
    Object.keys(tokens[1].Tokens.modes[mode]).forEach(type => {
      // colors can be combined into one object but other types will need to be broken up more i.e border: { radius: { tokenName: 'tokenVal' }}
      const tokensWithMappedValues = flattenTokenObject(tokens[1].Tokens.modes[mode][type]);
      if (type !== 'color') {
        // will contain things like radius for border
        let tempTypePropObj = {};
        Object.keys(tokens[1].Tokens.modes[mode][type]).forEach(prop => {
          updateTokensWithMappedValues(brand, tokensWithMappedValues, themes);
          tempTypePropObj[prop] = tokensWithMappedValues;
        });
        tempTypeObj[type] = tempTypePropObj;
      } else {
        updateTokensWithMappedValues(brand, tokensWithMappedValues, themes);
        tempTypeObj[type] = tokensWithMappedValues;
      }
    });

    // use a different key name for light/dark mode
    const modeShort = mode.includes('Light') ? 'light' : 'dark';
    tempModeObj[modeShort] = tempTypeObj;
  });
  flattenedTokens[brand] = tempModeObj;
});

const outputPath = path.resolve(__dirname, '../flattened-tokens.json');

fs.writeFileSync(outputPath, JSON.stringify(flattenedTokens, null, 2));
