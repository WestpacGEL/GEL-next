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
 * Resolve variable value with brand-specific overrides
 * This function checks for variable overrides first, then falls back to base values
 */
function resolveValueWithOverrides(valueData, variablesMap, resolvedType, collection, variables, modeId, baseVariableId) {
  // Check if this collection has variable overrides for this specific variable
  if (collection.variableOverrides && baseVariableId && collection.variableOverrides[baseVariableId]) {
    const overrides = collection.variableOverrides[baseVariableId];
    
    // Look for override with matching mode ID
    // The key format matches the full modeId exactly
    const overrideKey = Object.keys(overrides).find(key => key === modeId);
    
    if (overrideKey && overrides[overrideKey]) {
      // Use the override value
      const overrideValue = overrides[overrideKey];
      if (overrideValue.type === 'VARIABLE_ALIAS') {
        const referencedVar = variables[overrideValue.id];
        if (referencedVar) {
          let refPath = parseVariableName(referencedVar.name).join('.');
          return `{Primitives.${refPath}}`; // Include Primitives prefix
        }
      }
      // Handle direct color values in overrides
      return resolveDirectValue(overrideValue, resolvedType);
    }
  }
  
  // Fallback to base resolution
  return resolveValue(valueData, variablesMap, resolvedType);
}

/**
 * Resolve variable value (handle aliases) - original function
 */
function resolveValue(valueData, variablesMap, resolvedType) {
  if (valueData.type === 'VARIABLE_ALIAS') {
    const referencedVar = variablesMap[valueData.id];
    if (referencedVar) {
      let refPath = parseVariableName(referencedVar.name).join('.');
      return `{${refPath}}`;
    }
    return null;
  }
  
  return resolveDirectValue(valueData, resolvedType);
}

/**
 * Resolve direct color/value data
 */
function resolveDirectValue(valueData, resolvedType) {
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
 * Main transformation function
 */
function transformFigmaRestResponse(figmaData) {
  const { variableCollections, variables } = figmaData.meta;
  
  const result = [];
  
  // ========================================
  // 1. Transform Primitives
  // ========================================
  const primitiveCollection = Object.values(variableCollections).find(c => c.name === 'Primitives');
  if (primitiveCollection) {
    // Process the single mode for primitives collection
    const mode = primitiveCollection.modes[0];
    if (mode) {
      let primitivesData = {};
      
      const collectionVars = primitiveCollection.variableIds
        .map(varId => variables[varId])
        .filter(v => v != null);
      
      collectionVars.forEach(variable => {
        const pathParts = parseVariableName(variable.name);
        const valueData = variable.valuesByMode[mode.modeId];
        
        if (valueData === undefined || valueData === null) return;
        
        const value = resolveValue(valueData, variables, variable.resolvedType);
        if (value === null) return;
        
        const tokenValue = {
          $type: getFigmaType(variable.resolvedType),
          $value: value
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
        primitivesData = deepMerge(primitivesData, nested);
      });
      
      result.push({
        Primitives: primitivesData
      });
    }
  }
    
  // ========================================
  // 2. Transform Tokens (semantic token collections)
  // ========================================
  
  // Find the base Westpac collection that contains semantic token definitions
  const westpacCollection = Object.values(variableCollections).find(c => c.name === 'Westpac');
  
  // Find brand extension collections that contain variable overrides
  const brandExtensions = Object.values(variableCollections).filter(c => 
    ['StGeorge', 'Bank SA', 'Bank of Melbourne'].includes(c.name) && c.isExtension
  );
  
  // Map collection names to brand codes
  const collectionToBrandCode = {
    'Westpac': 'WBC',
    'StGeorge': 'STG', 
    'Bank SA': 'BSA',
    'Bank of Melbourne': 'BOM'
  };

  // Create consolidated tokens structure
  const consolidatedTokens = {
    Tokens: {
      modes: {}
    }
  };
  
  // Process Westpac (base collection with all semantic tokens)
  if (westpacCollection) {
    const lightMode = westpacCollection.modes.find(m => m.name === 'Light mode');
    const darkMode = westpacCollection.modes.find(m => m.name === 'Dark mode');
    
    if (lightMode && darkMode) {
      // Initialize Westpac brand modes
      consolidatedTokens.Tokens.modes['Westpac'] = {
        'light-mode': {},
        'dark-mode': {}
      };
      
      // Process semantic tokens from base Westpac collection
      const collectionVars = westpacCollection.variableIds
        .map(varId => variables[varId])
        .filter(v => v != null);
      
      // Process Light mode for base Westpac collection (no overrides)
      collectionVars.forEach(variable => {
        const pathParts = parseVariableName(variable.name);
        const baseValueData = variable.valuesByMode[lightMode.modeId];
        
        if (baseValueData === undefined || baseValueData === null) return;
        
        // Use base values (no overrides for Westpac)
        const value = resolveValue(baseValueData, variables, variable.resolvedType);
        
        if (value === null) return;
        
        const tokenValue = {
          $type: getFigmaType(variable.resolvedType),
          $value: value,
          $collectionName: 'Primitives'
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
        consolidatedTokens.Tokens.modes['Westpac']['light-mode'] = deepMerge(consolidatedTokens.Tokens.modes['Westpac']['light-mode'], nested);
      });
      
      // Process Dark mode for base Westpac collection (no overrides)
      collectionVars.forEach(variable => {
        const pathParts = parseVariableName(variable.name);
        const baseValueData = variable.valuesByMode[darkMode.modeId];
        
        if (baseValueData === undefined || baseValueData === null) return;
        
        // Use base values (no overrides for Westpac)
        const value = resolveValue(baseValueData, variables, variable.resolvedType);
        
        if (value === null) return;
        
        const tokenValue = {
          $type: getFigmaType(variable.resolvedType),
          $value: value,
          $collectionName: 'Primitives'
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
        consolidatedTokens.Tokens.modes['Westpac']['dark-mode'] = deepMerge(consolidatedTokens.Tokens.modes['Westpac']['dark-mode'], nested);
      });
    }
  }

  // Process each brand extension collection with overrides
  brandExtensions.forEach(brandCollection => {
    const brandCode = collectionToBrandCode[brandCollection.name];
    const brandName = brandCollection.name;
    if (!brandCode || !westpacCollection) return;
    
    // Process both light and dark modes
    const lightMode = brandCollection.modes.find(m => m.name === 'Light mode');
    const darkMode = brandCollection.modes.find(m => m.name === 'Dark mode');
    
    if (!lightMode || !darkMode) return;
    
    // Initialize brand modes in consolidated structure
    consolidatedTokens.Tokens.modes[brandName] = {
      'light-mode': {},
      'dark-mode': {}
    };
    
    // Use semantic tokens from base Westpac collection but apply brand overrides
    const collectionVars = westpacCollection.variableIds
      .map(varId => variables[varId])
      .filter(v => v != null);
    
    // Process Light mode with brand overrides
    collectionVars.forEach(variable => {
      const pathParts = parseVariableName(variable.name);
      // Get base value from the parent mode (Westpac collection)
      const baseValueData = variable.valuesByMode[lightMode.parentModeId];
      
      if (baseValueData === undefined || baseValueData === null) return;
      
      // Use overrides from brand collection with the brand's mode ID
      const value = resolveValueWithOverrides(
        baseValueData, 
        variables, 
        variable.resolvedType, 
        brandCollection,  // Use brand collection for overrides
        variables, 
        lightMode.modeId, // Use brand mode ID for override lookup
        variable.id  // Base variable ID for override lookup
      );
      
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Primitives'
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
      consolidatedTokens.Tokens.modes[brandName]['light-mode'] = deepMerge(consolidatedTokens.Tokens.modes[brandName]['light-mode'], nested);
    });
    
    // Process Dark mode with brand overrides
    collectionVars.forEach(variable => {
      const pathParts = parseVariableName(variable.name);
      // Get base value from the parent mode (Westpac collection)
      const baseValueData = variable.valuesByMode[darkMode.parentModeId];
      
      if (baseValueData === undefined || baseValueData === null) return;
      
      // Use overrides from brand collection with the brand's mode ID
      const value = resolveValueWithOverrides(
        baseValueData, 
        variables, 
        variable.resolvedType, 
        brandCollection,  // Use brand collection for overrides
        variables, 
        darkMode.modeId,  // Use brand mode ID for override lookup
        variable.id  // Base variable ID for override lookup
      );
      
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Primitives'
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
      consolidatedTokens.Tokens.modes[brandName]['dark-mode'] = deepMerge(consolidatedTokens.Tokens.modes[brandName]['dark-mode'], nested);
    });
  });
  
  // Push the consolidated tokens structure
  result.push(consolidatedTokens);
  
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
