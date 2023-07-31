import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import prettier from 'prettier';
import { iconTemplate } from './icon-template.js';

const prettierConfig = prettier.resolveConfig.sync(path.join(process.cwd(), '../../.prettierrc'));

const formatIconName = (icon: string) => {
  const iconFileName = icon.replace(/-(outlined|filled)$/, '');
  const name = iconFileName[0].toUpperCase() + iconFileName.slice(1);
  const iconComponentName = name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  const ariaLabel = name.replace(/-([a-z])/g, (_, char) => ` ${char.toUpperCase()}`);
  return { iconComponentName, iconFileName, ariaLabel };
};

const formatSVG = (svg: Buffer, pathCount: number) => {
  const iconPaths = svg
    .toString()
    .replace(/<\/?svg[^>]*>/g, '')
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .trim();

  return pathCount > 1 ? `<Fragment>${iconPaths}</Fragment>` : iconPaths;
};

const main = async () => {
  const iconFiles = glob.sync('assets/icons/filled/*.svg');
  const iconCount = iconFiles.length;
  const iconNames: string[] = [];
  let i = 1;

  console.log('Building icons...');

  for (const iconPath of iconFiles) {
    const fileName = path.basename(iconPath, path.extname(iconPath));
    const { iconComponentName, iconFileName, ariaLabel } = formatIconName(fileName);
    const outlinedPath = iconPath.replace(/filled/g, 'outlined');

    console.log(`[${i}/${iconCount}] ${iconComponentName}Icon`);

    const [filledSVG, outlinedSVG] = await Promise.all([
      fs.promises.readFile(iconPath),
      fs.promises.readFile(outlinedPath),
    ]);

    const filledPathCount = filledSVG.toString().match(/path/g)?.length || 0;
    const outlinedPathCount = outlinedSVG.toString().match(/path/g)?.length || 0;

    const addFragment = filledPathCount > 1 || outlinedPathCount > 1;

    const filledPaths = formatSVG(filledSVG, filledPathCount);
    const outlinedPaths = formatSVG(outlinedSVG, outlinedPathCount);

    const iconComponent = prettier.format(
      iconTemplate(iconComponentName, ariaLabel, filledPaths, outlinedPaths, addFragment),
      {
        parser: 'typescript',
        ...(prettierConfig || {}),
      },
    );

    await fs.promises.writeFile(
      path.join(process.cwd(), `src/components/icon/components/${iconFileName}-icon.tsx`),
      iconComponent,
    );

    iconNames.push(`export { ${iconComponentName}Icon } from './components/${iconFileName}-icon.js';`);
    i++;
  }

  iconNames.sort();
  iconNames.push(`\nexport { type IconProps } from './icon.types.js';\n`);
  await fs.promises.writeFile(path.join(process.cwd(), 'src/components/icon/index.ts'), iconNames.join('\n'));

  console.log('\nFinished building icons');
};

main();
