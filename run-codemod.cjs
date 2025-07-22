const { execSync } = require('child_process');
const glob = require('glob');

// Find all files ending with styles.ts inside components folder
const files = glob.sync('./packages/ui/src/components/**/**.styles.ts');

files.forEach(file => {
  console.log(`Running codemod on ${file}`);
  execSync(`jscodeshift --parser=tsx -t ./packages/ui/scripts/update-tokens-codemod.cjs ${file}`, {
    stdio: 'inherit'
  });
});