import { mkdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const pkg = join(root, '..');
const bundled = join(pkg, 'src', '.bundled');
mkdirSync(bundled, { recursive: true });

const domains = [
  'identity',
  'projects',
  'comments',
  'aggregates',
  'alerts',
  'dossiers',
  'external-links',
];

for (const domain of domains) {
  for (const ext of ['openapi.yaml', 'json']) {
    const out = join(bundled, `${domain}.${ext === 'json' ? 'json' : 'openapi.yaml'}`);
    const r = spawnSync(
      'pnpm',
      ['exec', 'redocly', 'bundle', domain, '--output', out],
      { cwd: pkg, stdio: 'inherit' }
    );
    if (r.status !== 0) process.exit(r.status ?? 1);
  }
}
