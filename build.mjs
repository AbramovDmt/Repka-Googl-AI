// Build wrapper: restores source template, builds, deploys to root index.html
import { copyFileSync } from 'fs';
import { execSync } from 'child_process';

copyFileSync('index-source.html', 'index.html');
console.log('Restored source index.html');

execSync('vite build', { stdio: 'inherit' });

copyFileSync('dist/index.html', 'index.html');
console.log('Deployed dist/index.html -> index.html');
