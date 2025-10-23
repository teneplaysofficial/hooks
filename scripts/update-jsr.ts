import { readFileSync, writeFileSync } from 'fs';

try {
  const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
  const jsr = JSON.parse(readFileSync('./jsr.json', 'utf8'));
  jsr.version = pkg.version;
  writeFileSync('./jsr.json', JSON.stringify(jsr, null, 2) + '\n');
} catch (e) {
  console.error(e);
}
