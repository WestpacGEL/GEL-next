import fs from 'fs/promises';
import path from 'path';

const exports: Record<string, { default: string }> = {
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
  './tailwind': {
    default: './dist/tailwind/index.js',
  },
  './themes': {
    default: './dist/tailwind/themes/index.js',
  },
  './themes-constants': {
    default: './dist/tailwind/constants/index.js',
  },
};

const main = async () => {
  const components = (await fs.readdir(path.join(process.cwd(), 'src/components'), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  components.forEach(component => {
    exports[`./${component}`] = { default: `./dist/components/${component}/index.js` };
  });

  const pkgJsonPath = path.join(process.cwd(), 'package.json');
  const data = await fs.readFile(pkgJsonPath, 'utf-8');
  const pkgJson = JSON.parse(data);
  pkgJson.exports = exports;
  await fs.writeFile(pkgJsonPath, JSON.stringify(pkgJson));
};

main();
