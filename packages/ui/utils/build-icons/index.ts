import path from 'path';
import fs from 'fs';
import { glob } from 'glob';
import prettier from 'prettier';
import { iconTemplate } from './icon-template.js';

const prettierConfig = prettier.resolveConfig.sync(path.join(process.cwd(), '../../.prettierrc'));

/**
 * Format given icon file name
 *
 * @param {string} icon
 * @returns {object} - object containing required names for generation
 */
const formatIconName = (icon: string) => {
  const iconFileName = icon.replace(/-(outlined|filled)$/, '');
  const name = iconFileName[0].toUpperCase() + iconFileName.slice(1);
  const iconComponentName = name.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  const ariaLabel = name.replace(/-([a-z])/g, (_, char) => ` ${char.toUpperCase()}`);
  return { iconComponentName, iconFileName, ariaLabel };
};

/**
 * Formats SVG for use as a react child
 *
 * @param {string} svg
 * @param {number} pathCount - number of paths in svg
 * @param {boolean} addFragment - extra condition to add fragment, used to filer cases where filled and outlined use the same svg
 * @returns {string} - formatted svg path for use as react child
 */
const formatSVG = (svg: Buffer, pathCount: number, addFragment: Boolean) => {
  const iconPaths = svg
    .toString()
    .replace(/<\/?svg[^>]*>/g, '')
    .replace(/fill="[^"]*"/g, 'fill="currentColor"')
    .replace(/fill-rule/g, 'fillRule')
    .replace(/clip-rule/g, 'clipRule')
    .trim();

  return pathCount > 1 && addFragment ? `<Fragment>${iconPaths}</Fragment>` : iconPaths;
};

/**
 * Create the child output of the icon component
 *
 * @param {boolean} sameSVG - if filled and outlined use the same SVG
 * @param {string} filledSVG
 * @param {string} outlinedSVG
 * @returns {string} - final child icon component output
 */
const getChildren = (sameSVG: boolean, filledSVG: string, outlinedSVG: string) =>
  sameSVG ? filledSVG : `{look === "filled" ? ${filledSVG} : ${outlinedSVG}}`;

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

    const sameSVG = filledSVG.toString() === outlinedSVG.toString();

    const filledPathCount = filledSVG.toString().match(/path/g)?.length || 0;
    const outlinedPathCount = outlinedSVG.toString().match(/path/g)?.length || 0;

    const addFragment = !sameSVG && (filledPathCount > 1 || outlinedPathCount > 1);

    const filledPaths = formatSVG(filledSVG, filledPathCount, addFragment);
    const outlinedPaths = formatSVG(outlinedSVG, outlinedPathCount, addFragment);

    const children = getChildren(sameSVG, filledPaths, outlinedPaths);

    const iconComponent = prettier.format(iconTemplate(iconComponentName, ariaLabel, children, addFragment, sameSVG), {
      parser: 'typescript',
      ...(prettierConfig || {}),
    });

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
