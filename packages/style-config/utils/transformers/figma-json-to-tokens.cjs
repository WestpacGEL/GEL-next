const fileSystem = require('fs-extra');
const path = require('path');

// script will write
const GENERATED_TOKENS_FILE = path.resolve(__dirname, '../../src/tokens/GEL-tokens-figma.json');

// folder with raw inputs
const FIGMA_JSON_DIRECTORY = path.resolve(__dirname, '../../src/tokens/figma-exports/2026');

// brand file shapes
const BRAND_JSON_CONFIG = {
  Westpac: {
    directory: 'wbc',
    metadataName: 'Westpac',
  },
  StGeorge: {
    directory: 'stg',
    metadataName: 'StGeorge',
  },
  'Bank SA': {
    directory: 'bsa',
    metadataName: 'Bank SA',
  },
  'Bank of Melbourne': {
    directory: 'bom',
    metadataName: 'Bank of Melbourne',
  },
};

// locate primitives file
const PRIMITIVES_JSON_FILE = path.join(FIGMA_JSON_DIRECTORY, 'primitives', 'primitives.tokens.json');

const FIGMA_INFORMATION_NAMES = {
  alias: 'com.figma.aliasData', // info of another token being referenced
  scopes: 'com.figma.scopes', // where the token is permitted to be used
  hiddenFromPublishing: 'com.figma.hiddenFromPublishing', // marked as internal
};

// read figma information
function getFigmaTokenInformation(figmaToken) {
  const figmaInformation = figmaToken.$extensions ?? {};

  const aliasInformation = figmaInformation[FIGMA_INFORMATION_NAMES.alias];
  const scopes = figmaInformation[FIGMA_INFORMATION_NAMES.scopes];
  const hiddenFromPublishing = figmaInformation[FIGMA_INFORMATION_NAMES.hiddenFromPublishing];

  return {
    primitivePath: aliasInformation?.targetVariableName,
    scopes,
    hiddenFromPublishing,
  };
}

// is it a token? does it have the value field?
function isToken(node) {
  return node && typeof node === 'object' && Object.hasOwn(node, '$value');
}

// match types and values with what's expected by GEL
function convertFigmaTypeToGelType(type) {
  if (type === 'number') {
    return 'float';
  }

  return type;
}

function convertFigmaValueToGelValue(value, type) {
  if (type === 'color' && value && typeof value === 'object') {
    if (!value.hex) {
      throw new Error('A colour token is missing its hex value');
    }

    return value.hex;
  }

  return value;
}

function aliasNameToGELReference(targetVariableName) {
  const dottedName = targetVariableName.split('/').join('.');
  return `{Primitives.${dottedName}}`;
}

// transform token to GEL expectations
function convertFigmaTokenToGelToken(figmaToken, collectionName) {
  const { $type: figmaType, $value: figmaValue, $description: description } = figmaToken;

  const { primitivePath, scopes, hiddenFromPublishing } = getFigmaTokenInformation(figmaToken);

  let gelValue;

  gelValue = primitivePath
    ? aliasNameToGELReference(primitivePath)
    : convertFigmaValueToGelValue(figmaValue, figmaType);

  const gelToken = {
    $type: convertFigmaTypeToGelType(figmaType),
    $value: gelValue,
  };

  if (description) gelToken.$description = description;
  if (scopes?.length) gelToken.$scopes = scopes;
  if (hiddenFromPublishing) gelToken.$hiddenFromPublishing = true;
  if (collectionName) gelToken.$collectionName = collectionName;

  return gelToken;
}

function normalizeFigmaExport(figmaItem, collectionName) {
  if (!figmaItem || typeof figmaItem !== 'object') {
    return figmaItem;
  }

  if (isToken(figmaItem)) {
    return convertFigmaTokenToGelToken(figmaItem, collectionName);
  }

  const normalizedGroup = {};

  for (const [key, value] of Object.entries(figmaItem)) {
    if (key === '$extensions') {
      continue;
    }

    normalizedGroup[key] = normalizeFigmaExport(value, collectionName);
  }

  return normalizedGroup;
}

// does the primitive in the semantic actually exist?
function doesPrimitiveTokenExist(primitivesJson, primitivePath) {
  let currentItem = primitivesJson;

  for (const pathPart of primitivePath.split('/')) {
    if (!currentItem || !Object.hasOwn(currentItem, pathPart)) {
      return false;
    }

    currentItem = currentItem[pathPart];
  }

  return isToken(currentItem);
}

// find every broken alias
function findMissingAliases(figmaItem, primitivesJson, currentTokenPath = [], missingAliases = []) {
  if (!figmaItem || typeof figmaItem !== 'object') {
    return missingAliases;
  }

  if (isToken(figmaItem)) {
    const { primitivePath } = getFigmaTokenInformation(figmaItem);

    const primitiveIsMissing = primitivePath && !doesPrimitiveTokenExist(primitivesJson, primitivePath);

    if (primitiveIsMissing) {
      missingAliases.push({ semanticToken: currentTokenPath.join('.'), missingPrimitive: primitivePath });
    }

    return missingAliases;
  }

  for (const [itemName, childItem] of Object.entries(figmaItem)) {
    if (itemName === '$extensions') {
      continue;
    }

    const childItemPath = [...currentTokenPath, itemName];

    findMissingAliases(childItem, primitivesJson, childItemPath, missingAliases);
  }

  return missingAliases;
}

// validate brand and mode
function getBrandAndModeFromExport(brandModeJson) {
  const fileInformation = brandModeJson.misc;

  const brandNameToken = fileInformation?.['multi-brand'];
  const modeNameToken = fileInformation.mode;

  const brandName = brandNameToken.$value;
  const modeName = modeNameToken.$value;

  return {
    brandName,
    modeName,
  };
}

function validateBrandModeFile(brandModeJson, expectedBrandName, expectdModeName, primitivesJson) {
  const exportInformation = getBrandAndModeFromExport(brandModeJson);

  const { brandName: actualBrandName, modeName: actualModeName } = getBrandAndModeFromExport(brandModeJson);

  if (!actualBrandName) {
    throw new Error(`The ${expectedBrandName} ${expectdModeName} file does not contain a brand name`);
  }

  if (actualBrandName !== expectedBrandName) {
    throw new Error(`Expected the ${expectedBrandName} file, but this file contains ${actualBrandName}`);
  }

  if (!actualModeName) {
    throw new Error(`The ${expectedBrandName} ${expectdModeName} file does not contain a mode name.`);
  }

  if (actualModeName !== expectdModeName) {
    throw new Error(`Expected ${expectedBrandName} ${expectdModeName}, but this file contains ${actualModeName}`);
  }

  const missingAliases = findMissingAliases(brandModeJson, primitivesJson);

  if (missingAliases.length === 0) {
    return;
  }

  const errorLines = [];

  for (const missingAlias of missingAliases) {
    errorLines.push(`${missingAlias.semanticToken} refers to missing primitive ${missingAlias.missingPrimitive}`);
    throw new Error([`${expectedBrandName} ${expectdModeName} refers to missing primitive`, ...errorLines].join('\n'));
  }
}

// read a single brands relative files
async function readBrandModes(directory) {
  const brandDirectory = path.join(FIGMA_JSON_DIRECTORY, directory);
  const lightFile = path.join(brandDirectory, 'light-mode.tokens.json');
  const darkFile = path.join(brandDirectory, 'dark-mode.tokens.json');

  const lightJson = await fileSystem.readJSON(lightFile);
  const darkJson = await fileSystem.readJSON(darkFile);

  return {
    lightJson,
    darkJson,
  };
}

// generate each brand from json source
async function transformLocalFigmaExports(primitivesJson) {
  const brandModes = {};

  for (const [themeName, config] of Object.entries(BRAND_JSON_CONFIG)) {
    const { lightJson, darkJson } = await readBrandModes(config.directory);

    validateBrandModeFile(lightJson, config.metadataName, 'Light mode', primitivesJson);
    validateBrandModeFile(darkJson, config.metadataName, 'Dark mode', primitivesJson);

    brandModes[themeName] = {
      'light-mode': normalizeFigmaExport(lightJson, 'Primitives'),
      'dark-mode': normalizeFigmaExport(darkJson, 'Primitives'),
    };
  }

  return [
    {
      Primitives: normalizeFigmaExport(primitivesJson),
    },
    {
      Tokens: {
        modes: brandModes,
      },
    },
  ];
}

async function main() {
  try {
    console.log('Reading local Figma JSON exports...');
    const primitiveJson = await fileSystem.readJson(PRIMITIVES_JSON_FILE);

    console.log('Validating and transforming all brands...');
    const generatedTokens = await transformLocalFigmaExports(primitiveJson);

    console.log('Writing GEL token output...');
    await fileSystem.writeJSON(GENERATED_TOKENS_FILE, generatedTokens, { spaces: 2 });

    console.log(`Transformation complete ${GENERATED_TOKENS_FILE}`);
    console.log('Dark-mode data was retained; downstream dark output remains disabled');
  } catch (error) {
    console.error('Error transforming local Figma exports:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  normalizeFigmaExport,
  transformLocalFigmaExports,
  validateBrandModeFile,
};
