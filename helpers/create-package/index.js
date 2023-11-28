/* eslint-disable no-console */
const shell = require('child_process').execSync;
const fs = require('fs');
const readline = require('readline');

const destinationPrefix = './packages/';
const packageNamePrefix = '@westpac/';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const getDetails = detail => {
  return new Promise((resolve, reject) => {
    rl.question(`Enter ${detail}: `, answer => {
      if (answer) {
        resolve(answer);
      } else {
        reject(`Please enter a package ${detail}!`);
      }
    });
  });
};

const confirm = name => {
  return new Promise(resolve => {
    console.log(`\nPackage Name: ${packageNamePrefix}${name}`);
    rl.question('\nConfirm creation (y/N)? ', answer => {
      resolve(answer);
    });
  });
};

const updateReferences = (dir, packageName) => {
  const path = `${dir}/package.json`;
  fs.readFile(path, 'utf-8', (error, content) => {
    if (error) {
      console.log('An error occurred while reading the file');
      console.error(error);
      return;
    }

    const newContent = content.replace('_PACKAGE_NAME_', packageName);

    fs.writeFile(path, newContent, 'utf-8', error => {
      if (error) {
        console.log('An error occurred while writing the file');
        console.error(error);
      }
    });
  });
};

const createPackage = packageName => {
  const src = `./helpers/create-package/.template-ts`;
  const dest = `${destinationPrefix}${packageName}`;

  shell(`shx cp -r ${src}/ ${dest}`);
  shell(`pnpm install`);

  updateReferences(dest, packageName);
};

const main = async () => {
  let packageName;

  do {
    packageName = await getDetails('name').catch(console.error);
  } while (!packageName);

  packageName = packageName.toLowerCase().replace(/\s+/g, '-');

  const confirmation = await confirm(packageName);
  rl.close();

  if (confirmation === 'y') {
    console.log(`\nCreating ${packageName} package...\n`);
    createPackage(packageName);
    console.log(`\nYour new package ${packageNamePrefix}${packageName} has been successfully created!`);
    console.log(`\nYou can find the new package here: ${destinationPrefix}${packageName}`);
  }
};

main();
