/* eslint-disable no-console */

/**
 * NOTE: This file was generated due a change in formatting to the source file to minimise breaking changes.
 * Transforms Figma REST API response to the format we were originally using
 * This script converts the raw Figma REST API response into the structure
 * expected by the style-dictionary script.
 * 
 * The Figma rest response currently includes unique IDs for variables and collections, which is another reason for the conversion.
 * This may be updated in the future if GEL is no longer public.
 */

const fs = require('fs-extra');

// Figma API configuration
// Place these values in a .env.local file at the root of style-config package and run pnpm build:tokens-file
const FIGMA_PROJECT_ID = process.env.FIGMA_PROJECT_ID;
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;

/**
 * Fetches design tokens from Figma API
 * @returns {Promise<Object>} Figma REST API response
 */
async function fetchFigmaTokens() {
  if (!FIGMA_PROJECT_ID) {
    throw new Error('FIGMA_PROJECT_ID environment variable is required');
  }
  if (!FIGMA_TOKEN) {
    throw new Error('FIGMA_TOKEN environment variable is required');
  }

  const https = require('https');
  const url = `https://api.figma.com/v1/files/${FIGMA_PROJECT_ID}/variables/local`;
  
  return new Promise((resolve, reject) => {
    console.log('🔄 Fetching tokens from Figma API...');
    
    const options = {
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
        'User-Agent': 'GEL-Next-Style-Dictionary/1.0'
      }
    };

    const req = https.request(url, options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const jsonData = JSON.parse(data);
            console.log('✅ Successfully fetched tokens from Figma API');
            resolve(jsonData);
          } catch (parseError) {
            reject(new Error(`Failed to parse JSON response: ${parseError.message}`));
          }
        } else {
          reject(new Error(`Figma API request failed: ${res.statusCode} ${res.statusMessage}\nResponse: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Failed to fetch tokens from Figma API:', error);
      reject(error);
    });

    req.end();
  });
}

/**
 * Parse variable name into path components
 * Example: "color/background/background-white" => ["color", "background", "background-white"]
 */
function parseVariableName(name) {
  return name.split('/');
}

/**
 * Convert variable path components to nested object structure
 * Handles special cases like border.radius and color palettes
 */
function pathToNestedObject(pathParts, value) {
  if (pathParts.length === 0) return value;
  if (pathParts.length === 1) {
    return { [pathParts[0]]: value };
  }
  
  const result = {};
  let current = result;
  
  for (let i = 0; i < pathParts.length - 1; i++) {
    current[pathParts[i]] = {};
    current = current[pathParts[i]];
  }
  
  current[pathParts[pathParts.length - 1]] = value;
  return result;
}

/**
 * Deep merge objects
 */
function deepMerge(target, source) {
  const output = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (target[key] && typeof target[key] === 'object') {
        output[key] = deepMerge(target[key], source[key]);
      } else {
        output[key] = source[key];
      }
    } else {
      output[key] = source[key];
    }
  }
  
  return output;
}

/**
 * Resolve variable value (handle aliases)
 * For Token collections, convert Primitive references to Theme references
 */
function resolveValue(valueData, variablesMap, resolvedType, isTokenCollection = false) {
  if (valueData.type === 'VARIABLE_ALIAS') {
    const referencedVar = variablesMap[valueData.id];
    if (referencedVar) {
      // Return alias reference in curly braces
      let refPath = parseVariableName(referencedVar.name).join('.');
      
      // If this is a Token collection referencing a Primitive, convert to Theme reference
      // e.g., color.WBC.primary.500 -> color.primary.500
      if (isTokenCollection) {
        const parts = refPath.split('.');
        if (parts.length >= 3 && ['WBC', 'STG', 'BOM', 'BSA'].includes(parts[1])) {
          // Remove the brand code to make it a Theme reference
          parts.splice(1, 1);
          refPath = parts.join('.');
        }
      }
      
      return `{${refPath}}`;
    }
    return null;
  }
  
  // Handle different value types
  switch (resolvedType) {
    case 'COLOR':
      if (valueData.r !== undefined) {
        // Convert RGBA to hex (with alpha channel if present and not fully opaque)
        const r = Math.round(valueData.r * 255);
        const g = Math.round(valueData.g * 255);
        const b = Math.round(valueData.b * 255);
        const a = valueData.a !== undefined ? valueData.a : 1;
        
        if (a < 1) {
          // Include alpha channel for transparent colors
          const alpha = Math.round(a * 255);
          const hex = '#' + [r, g, b, alpha].map(x => x.toString(16).padStart(2, '0')).join('');
          return hex;
        } else {
          // Opaque colors use 6-digit hex
          const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
          return hex;
        }
      }
      return valueData;
      
    case 'FLOAT':
      return valueData;
      
    case 'STRING':
      return valueData;
      
    default:
      return valueData;
  }
}

/**
 * Get Figma type for W3C token format
 */
function getFigmaType(resolvedType) {
  switch (resolvedType) {
    case 'COLOR':
      return 'color';
    case 'FLOAT':
      return 'float';
    case 'STRING':
      return 'string';
    default:
      return 'dimension';
  }
}

/**
 * Transform a single variable collection
 */
function transformCollection(collection, variablesMap) {
  const result = {
    modes: {}
  };
  
  // Process each mode
  collection.modes.forEach(mode => {
    let modeData = {};
    
    // Get all variables for this collection
    const collectionVars = collection.variableIds
      .map(varId => variablesMap[varId])
      .filter(v => v != null);
    
    // Process each variable
    collectionVars.forEach(variable => {
      const pathParts = parseVariableName(variable.name);
      const valueData = variable.valuesByMode[mode.modeId];
      
      if (valueData === undefined || valueData === null) return;
      
      const value = resolveValue(valueData, variablesMap, variable.resolvedType);
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value
      };
      
      // Add optional properties
      if (variable.scopes && variable.scopes.length > 0) {
        tokenValue.$scopes = ['ALL_SCOPES'];
      }
      
      if (variable.hiddenFromPublishing) {
        tokenValue.$hiddenFromPublishing = true;
      }
      
      if (variable.description) {
        tokenValue.$description = variable.description;
      }
      
      const nested = pathToNestedObject(pathParts, tokenValue);
      modeData = deepMerge(modeData, nested);
    });
    
    result.modes[mode.name] = modeData;
  });
  
  return result;
}

/**
 * Main transformation function
 */
function transformFigmaRestResponse(figmaData) {
  const { variableCollections, variables } = figmaData.meta;
  
  const result = [];
  
  // Brand mapping from primitives to themes
  const BRAND_MAPPING = {
    'Westpac': 'WBC',
    'StGeorge': 'STG',
    'Bank SA': 'BSA',
    'Bank of Melbourne': 'BOM'
  };
  
  // ========================================
  // 1. Transform Primitives
  // ========================================
  const primitiveCollection = Object.values(variableCollections).find(c => c.name === 'Primitives');
  if (primitiveCollection) {
    const transformed = transformCollection(primitiveCollection, variables);
    // For Primitives, extract the single mode's data (no mode wrapper)
    const primitivesData = transformed.modes[Object.keys(transformed.modes)[0]] || {};
    result.push({
      Primitives: primitivesData
    });
  }
  
  // Skip Themes section - Tokens will reference Primitives directly
  
  // ========================================
  // 3. Transform Tokens (semantic token collections)
  // ========================================
  const tokenCollections = Object.values(variableCollections).filter(c => 
    ['Westpac', 'StGeorge', 'Bank SA', 'Bank of Melbourne'].includes(c.name)
  );
  
  const tokensResult = {
    Tokens: {
      modes: {
        'Light mode': {},
        'Dark mode': {}
      }
    }
  };
  
  // Process each collection and merge into Light/Dark modes
  tokenCollections.forEach(collection => {
    // Process both light and dark modes
    const lightMode = collection.modes.find(m => m.name === 'Light mode');
    const darkMode = collection.modes.find(m => m.name === 'Dark mode');
    
    if (!lightMode || !darkMode) return;
    
    // Process variables for this collection
    const collectionVars = collection.variableIds
      .map(varId => variables[varId])
      .filter(v => v != null);
    
    // Process Light mode
    collectionVars.forEach(variable => {
      const pathParts = parseVariableName(variable.name);
      const valueData = variable.valuesByMode[lightMode.modeId];
      
      if (valueData === undefined || valueData === null) return;
      
      const value = resolveValue(valueData, variables, variable.resolvedType, false); // Don't convert to theme references
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Primitives'  // Tokens reference Primitives directly
      };
      
      if (variable.scopes && variable.scopes.length > 0) {
        tokenValue.$scopes = ['ALL_SCOPES'];
      }
      
      if (variable.hiddenFromPublishing) {
        tokenValue.$hiddenFromPublishing = true;
      }
      
      if (variable.description) {
        tokenValue.$description = variable.description;
      }
      
      const nested = pathToNestedObject(pathParts, tokenValue);
      tokensResult.Tokens.modes['Light mode'] = deepMerge(tokensResult.Tokens.modes['Light mode'], nested);
    });
    
    // Process Dark mode
    collectionVars.forEach(variable => {
      const pathParts = parseVariableName(variable.name);
      const valueData = variable.valuesByMode[darkMode.modeId];
      
      if (valueData === undefined || valueData === null) return;
      
      const value = resolveValue(valueData, variables, variable.resolvedType, false); // Don't convert to theme references
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Primitives'  // Tokens reference Primitives directly
      };
      
      if (variable.scopes && variable.scopes.length > 0) {
        tokenValue.$scopes = ['ALL_SCOPES'];
      }
      
      if (variable.hiddenFromPublishing) {
        tokenValue.$hiddenFromPublishing = true;
      }
      
      if (variable.description) {
        tokenValue.$description = variable.description;
      }
      
      const nested = pathToNestedObject(pathParts, tokenValue);
      tokensResult.Tokens.modes['Dark mode'] = deepMerge(tokensResult.Tokens.modes['Dark mode'], nested);
    });
  });
  
  result.push(tokensResult);
  
  return result;
}

/**
 * Main execution (optional - only runs if script is executed directly)
 */
async function main() {
  const outputPath = './src/tokens/GEL-tokens-figma.json';
  
  try {
    // Fetch from Figma API instead of reading local file
    const figmaData = await fetchFigmaTokens();
    
    console.log('🔄 Transforming to GEL tokens format...');
    const transformed = transformFigmaRestResponse(figmaData);
    
    console.log('📝 Writing output...');
    await fs.writeJson(outputPath, transformed, { spaces: 2 });
    
    console.log('✅ Transformation complete!');
    console.log(`Output written to: ${outputPath}`);
  } catch (error) {
    console.error('❌ Error during transformation:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

// Export for testing
module.exports = { transformFigmaRestResponse };
