// Generates static SVG assets for each brand from an existing pictogram component.

import { writeFile } from 'fs/promises';

import { type ComponentType, createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { type PictogramProps } from '../../src/components/pictogram/pictogram.types.js';

import { getPictogramColors, pictogramBrands, type PictogramColors } from './pictogram-colors.js';

type PictogramComponent = ComponentType<PictogramProps>;

// Render the component as SVG markup.
const renderPictogram = (component: PictogramComponent, mode: 'base' | 'duo' | 'mono', colours: PictogramColors) => {
  let svg = renderToStaticMarkup(
    createElement(component, {
      mode,
      width: 78,
      height: 78,
      copyrightYear: '',
      fill: 'none',
    }),
  );

  // Replace theme-dependent colour fill classes with static brand colouring.
  svg = svg
    .replace(/ class="fill-surface-pictogram-base"/g, ` fill="${colours.base}"`)
    .replace(/ class="fill-surface-pictogram-accent"/g, ` fill="${colours.accent}"`)
    .replace(/ class="fill-surface-mono"/g, ` fill="${colours.mono}"`);

  if (svg.includes('fill-surface-')) {
    throw new Error('Generated SVG contains an unresolved fill class.');
  }

  // Remove unnecessary props svg will not need
  svg = svg.replace(/\s(?:class|role|focusable|aria-label)="[^"]*"/g, '');

  return `${svg}\n`;
};

// Write the SVG to its brand and colouring folder.
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
