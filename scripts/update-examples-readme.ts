import { globSync, readFileSync, writeFileSync } from 'fs';
import matter from 'gray-matter';

const path = './examples/README.md';
const files = globSync('examples/use*.md', { exclude: [path] });
const md = matter(readFileSync(path, 'utf-8'));

if (files.length) {
  md.data.children = files.map((f) => `./${f.replaceAll('\\', '/').replace(/^examples\//, '')}`);
  writeFileSync(path, matter.stringify(md.content, md.data), 'utf-8');
}
