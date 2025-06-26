/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

import archiver from 'archiver';
import { glob } from 'glob';

/**
 * Create a zip archive of SVG icons, preserving folder structure.
 *
 * @param {string} zipRoot - Root folder name inside the zip
 * @param {string[]} zipFiles - List of files to include
 * @param {string} zipStoragePath - Output directory for the zip file
 */
const exportZip = async (zipRoot: string, zipFiles: string[], zipStoragePath: string) => {
  console.log('Building zip files...');

  const zipPath = path.resolve(zipStoragePath, `${zipRoot}.zip`);
  fs.mkdirSync(path.dirname(zipPath), { recursive: true });

  const output = fs.createWriteStream(zipPath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`Zip file created at ${zipPath} (${archive.pointer()} total bytes)`);
  });

  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      console.warn('Archiver warning:', err);
    } else {
      throw err;
    }
  });

  archive.on('error', err => {
    throw err;
  });

  archive.pipe(output);

  zipFiles.forEach(file => {
    const relativePath = path.relative('assets/icons', file);
    const zipPathInArchive = path.join(zipRoot, relativePath);
    archive.file(file, { name: zipPathInArchive });
  });

  await archive.finalize();
};

const main = async () => {
  const iconsZipRoot = 'GEL_Icons';
  const iconFiles = glob.sync('assets/icons/**/*.*', { nodir: true });
  const zipStoragePath = '../../apps/site/public/assets';

  await exportZip(iconsZipRoot, iconFiles, zipStoragePath);
};

main().catch(err => {
  console.error('Error:', err);
  if (err && err.stack) {
    console.error(err.stack);
  }
});
