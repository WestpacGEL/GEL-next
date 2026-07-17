// This scripts purpose is to generate multiple brand pictogram assets using one existing component that already builds pictograms.
// Essentially turning the existing pictogram component into an instruction manual to make static svg asset files for all brands.

import { writeFile } from 'fs/promises';

import { type ComponentType, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { type PictogramProps } from '../../src/components/pictogram/pictogram.types.js';

import { getPictogramColors, pictogramBrands, type PictogramColours } from './pictogram-colors.js';

type PictogramComponent = ComponentType<PictogramProps>;

// to create the svg assets we use the existing pictogram component to render the base img first, then convert to save as svg
const renderPictogram = (component: PictogramComponent, mode: 'base' | 'duo' | 'mono', colours: PictogramColours) => {
  let svg = renderToStaticMarkup(
    createElement(component, {
      mode,
      width: 78,
      height: 78,
      copyrightYear: '',
      fill: 'none',
    }),
  );

  // replace component fill with set brand colours as when running the script the code will not know brand context
  svg = svg
    .replace(/ class="fill-surface-pictogram-base"/g, ` fill="${colours.base}"`)
    .replace(/ class="fill-surface-pictogram-accent"/g, ` fill="${colours.accent}"`)
    .replace(/ class="fill-surface-mono"/g, ` fill="${colours.mono}"`);

  if (svg.includes('fill-surface-')) {
    throw new Error('Generated SVG contains an unresolved fill class.');
  }

  // remove unnecessary props svg will not need
  svg = svg.replace(/\s(?:class|role|focusable|aria-label)="[^"]*"/g, '');

  return `${svg}\n`;
};

// create svg file in correct location
const writePictogram = async (folder: string, name: string, svg: string) => {
  const file = `assets/pictograms/${folder}/${name}.svg`;
  await writeFile(file, svg);
  /* eslint-disable no-console */
  console.log(`Written: ${file}`);
};

const main = async () => {
  const fileNames = process.argv.slice(2);

  if (!fileNames.length) {
    throw new Error('Provide a pictogram component file name, for example: mobile-device-pictogram');
  }

  for (const fileName of fileNames) {
    const pictogramModule = (await import(`../../src/components/pictogram/components/${fileName}.js`)) as Record<
      string,
      unknown
    >;

    const pictogramExport = Object.entries(pictogramModule).find(
      ([name, component]) => name.endsWith('Pictogram') && typeof component === 'function',
    );

    if (!pictogramExport) {
      throw new Error(`${fileName}.tsx does not export a pictogram component.`);
    }

    const [name, component] = pictogramExport as [string, PictogramComponent];

    for (const brand of pictogramBrands) {
      const colours = getPictogramColors(brand);

      await writePictogram(`${brand}/Dark`, name, renderPictogram(component, 'base', colours));

      await writePictogram(`${brand}/DUO`, name, renderPictogram(component, 'duo', colours));
    }

    await writePictogram('Light', name, renderPictogram(component, 'mono', getPictogramColors('WBC')));
  }
};

void main();
