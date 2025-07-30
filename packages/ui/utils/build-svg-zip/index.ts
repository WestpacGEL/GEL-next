/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import AdmZip from 'adm-zip';
import { glob } from 'glob';

/**
 * Formats SVG for use as a react child
 *
 * @param {string} zipRoot - zip root name
 * @param {string[]} zipFiles - files to be included in zip
 * @param {string} zipStoragePath - zip storage path
 */
const exportZip = (zipRoot: string, zipFiles: string[], zipStoragePath: string, type: string) => {
  console.log('Building zip files...');
  const zip = new AdmZip();
  zipFiles.forEach(file => {
    const filePath = path.resolve(file);
    const fileData = fs.readFileSync(filePath);
    const relativePath = path.relative('assets', file);
    console.log(relativePath);
    const zipPathInArchive = path.join(zipRoot, type, relativePath.replace(`${type}/`, ''));
    zip.addFile(zipPathInArchive, fileData);
  });

  const zipPath = path.resolve(zipStoragePath, `${zipRoot}.zip`);
  zip.writeZip(zipPath);
  console.log(`Zip file created at ${zipPath}`);
};

const main = () => {
  const iconsZipRoot = 'GEL_Icons';
  const iconFiles = glob.sync('assets/icons/**/*.*', { nodir: true });

  const pictogramZipRoot = 'GEL_Pictograms';
  const pictogramFiles = glob.sync('assets/pictograms/**/**/*.*', { nodir: true });

  const logoSymbolZipRoot = 'GEL_Logos_Symbols';
  const logoSymbolFiles = glob.sync('assets/logos-symbols/*.*', { nodir: true });

  const zipStoragePath = '../../apps/site/public/assets';

  exportZip(iconsZipRoot, iconFiles, zipStoragePath, 'icons');
  exportZip(pictogramZipRoot, pictogramFiles, zipStoragePath, 'pictograms');
  exportZip(logoSymbolZipRoot, logoSymbolFiles, zipStoragePath, 'logos-symbols');
};

main();
