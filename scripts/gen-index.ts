import { createWriteStream, globSync } from 'fs';
import { basename } from 'path';

const out = 'src/index.ts';
const files = globSync('./src/use*.ts', { exclude: [out, 'src/**/*.test.ts'] });
const stream = createWriteStream(out, 'utf-8');

files.forEach((f) => stream.write(`export * from './${basename(f, '.ts')}';`));
stream.end();
