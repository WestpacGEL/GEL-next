/* eslint-disable no-console */
const fs = require('fs-extra');

/**
 * NOTE: This file was generated due a change in formatting to the source file to minimise breaking changes.
 * Transforms Figma REST API response to the format we were originally using
 * This script converts the raw Figma REST API response into the structure
 * expected by the style-dictionary script.
 */

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
function transformCollection(collection, variablesMap, allCollections) {
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
 * Process variable overrides for extension collections
 */
function processVariableOverrides(collection, variablesMap, allCollections) {
  if (!collection.variableOverrides || !collection.relatedVariableIds) {
    return null;
  }
  
  const result = {
    modes: {}
  };
  
  // Process each mode
  collection.modes.forEach(mode => {
    let modeData = {};
    
    // Process overrides
    Object.entries(collection.relatedVariableIds).forEach(([baseVarId, overrideId]) => {
      const baseVar = variablesMap[baseVarId];
      if (!baseVar) return;
      
      const pathParts = parseVariableName(baseVar.name);
      
      // Get the override value
      const overrideData = collection.variableOverrides[baseVarId];
      if (!overrideData || !overrideData[mode.modeId]) return;
      
      const value = resolveValue(overrideData[mode.modeId], variablesMap, baseVar.resolvedType);
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(baseVar.resolvedType),
        $value: value
      };
      
      if (baseVar.hiddenFromPublishing) {
        tokenValue.$hiddenFromPublishing = true;
      }
      
      if (baseVar.description) {
        tokenValue.$description = baseVar.description;
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
    const transformed = transformCollection(primitiveCollection, variables, variableCollections);
    // For Primitives, extract the single mode's data (no mode wrapper)
    const primitivesData = transformed.modes[Object.keys(transformed.modes)[0]] || {};
    result.push({
      Primitives: primitivesData
    });
  }
  
  // ========================================
  // 2. Create Themes from Primitives
  // ========================================
  // Themes are brand-specific views of the primitives
  // For each brand, we take their primitive colors and create a theme
  const themesResult = {
    Themes: {
      modes: {}
    }
  };
  
  Object.entries(BRAND_MAPPING).forEach(([brandName, primitiveCode]) => {
    themesResult.Themes.modes[brandName] = {};
    
    // Get primitive colors for this brand
    if (primitiveCollection) {
      const primitiveVars = primitiveCollection.variableIds
        .map(varId => variables[varId])
        .filter(v => v && v.name.includes(`/${primitiveCode}/`));
      
      primitiveVars.forEach(variable => {
        const pathParts = parseVariableName(variable.name);
        // Replace primitive code with generic path
        // e.g., color/WBC/muted/50 -> color/muted/50
        const adjustedParts = pathParts.filter(p => p !== primitiveCode);
        
        const valueData = variable.valuesByMode[primitiveCollection.modes[0].modeId];
        if (valueData === undefined || valueData === null) return;
        
        const value = resolveValue(valueData, variables, variable.resolvedType);
        if (value === null) return;
        
        // Create alias reference back to primitive
        const primitiveRef = `{${pathParts.join('.')}}`;
        
        const tokenValue = {
          $type: getFigmaType(variable.resolvedType),
          $value: primitiveRef,
          $collectionName: 'Primitives'
        };
        
        if (variable.scopes && variable.scopes.length > 0) {
          tokenValue.$scopes = ['ALL_SCOPES'];
        }
        
        if (variable.hiddenFromPublishing) {
          tokenValue.$hiddenFromPublishing = true;
        }
        
        const nested = pathToNestedObject(adjustedParts, tokenValue);
        themesResult.Themes.modes[brandName] = deepMerge(themesResult.Themes.modes[brandName], nested);
      });
    }
  });
  
  result.push(themesResult);
  
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
      
      const value = resolveValue(valueData, variables, variable.resolvedType, true); // isTokenCollection = true
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Themes'  // Tokens reference Themes, not Primitives
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
      
      const value = resolveValue(valueData, variables, variable.resolvedType, true); // isTokenCollection = true
      if (value === null) return;
      
      const tokenValue = {
        $type: getFigmaType(variable.resolvedType),
        $value: value,
        $collectionName: 'Themes'  // Tokens reference Themes, not Primitives
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
 * Export the transformation function for use by other scripts
 */
module.exports = {
  transformFigmaRestResponse
};

/**
 * Main execution (optional - only runs if script is executed directly)
 */
async function main() {
  const inputPath = './src/tokens/figma-rest-response.json';
  const outputPath = './src/tokens/GEL-tokens-figma.json';
  
  try {
    console.log('Reading Figma REST API response...');
    const figmaData = await fs.readJson(inputPath);
    
    console.log('Transforming to GEL tokens format...');
    const transformed = transformFigmaRestResponse(figmaData);
    
    console.log('Writing output...');
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

module.exports = { transformFigmaRestResponse };
