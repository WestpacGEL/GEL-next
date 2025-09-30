import fs from 'fs/promises';
import path from 'path';

const exportMap: Record<string, { default: string }> = {
  '.': {
    default: './dist/index.js',
  },
  './component-type.json': {
    default: './dist/component-type.json',
  },
  './css': {
    default: './dist/css/westpac-ui.min.css',
  },
  './hook': {
    default: './dist/hook/index.js',
  },
  './types': {
    default: './dist/types/index.js',
  },
};

const main = async () => {
  const components = (await fs.readdir(path.join(process.cwd(), 'src/components'), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  components.forEach(component => {
    exportMap[`./${component}`] = { default: `./dist/components/${component}/index.js` };
  });

  const pkgJsonPath = path.join(process.cwd(), 'package.json');
  const data = await fs.readFile(pkgJsonPath, 'utf-8');
  const pkgJson = JSON.parse(data);
  pkgJson.exports = exportMap;
  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJson));
};

main();
