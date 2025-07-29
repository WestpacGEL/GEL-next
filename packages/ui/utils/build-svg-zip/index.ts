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
const exportZip = (zipRoot: string, zipFiles: string[], zipStoragePath: string) => {
  console.log('Building zip files...');
  const zip = new AdmZip();
  zipFiles.forEach(file => {
    const filePath = path.resolve(file);
    const fileData = fs.readFileSync(filePath);
    const relativePath = path.relative('assets', file);
    const zipPathInArchive = path.join(zipRoot, 'icons', relativePath.replace(/^icons[\\/]/, ''));
    zip.addFile(zipPathInArchive, fileData);
  });

  const zipPath = path.resolve(zipStoragePath, `${zipRoot}.zip`);
  zip.writeZip(zipPath);
  console.log(`Zip file created at ${zipPath}`);
};

const main = async () => {
  const iconsZipRoot = 'GEL_Icons';
  const iconFiles = glob.sync('assets/icons/**/*.*', { nodir: true });
  const zipStoragePath = '../../apps/site/public/assets';

  exportZip(iconsZipRoot, iconFiles, zipStoragePath);
};

main();
