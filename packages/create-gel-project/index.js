#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

import minimist from 'minimist';
import inquirer from 'inquirer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse args
const args = minimist(process.argv.slice(2));
// Example: potato => _[0], -t next => args.t
const targetDir = args._[0];
const templateName = args.t; // default template

if (!templateName) {
  const templates = fs.readdirSync(path.resolve(__dirname, './templates'));
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'Select a template:',
      choices: templates,
    },
  ]);
  templateName = answer.template;
}

if (!targetDir) {
  console.error('❌ Please specify a project name, e.g.:\n  npm create my-boilerplate@latest my-app');
  process.exit(1);
}

const templateDir = path.join(__dirname, '../../templates', templateName);
const projectDir = path.resolve(process.cwd(), targetDir);

console.log(`🧱 Creating new project in ${projectDir}...`);

if (fs.existsSync(projectDir)) {
  console.error('❌ Folder already exists. Please choose another name.');
  process.exit(1);
}

fs.copySync(templateDir, projectDir);
console.log('✅ Template copied!');

// Install dependencies
try {
  process.chdir(projectDir);
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('🎉 All done! Run:');
  console.log(`\n  cd ${targetDir}\n  npm run dev\n`);
} catch (err) {
  console.error('❌ Error installing dependencies:', err);
  process.exit(1);
}
