const { execFileSync } = require('child_process');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
const file = process.argv[2] || 'files';

try {
  if (!git('status', '--porcelain').trim()) process.exit(0);
  const time = new Date().toLocaleString('sv-SE').slice(0, 16);
  git('add', '-A');
  git('commit', '-q', '-m', `Auto-commit: saved ${file} (${time})`);
} catch (err) {
  console.error(`auto-commit skipped: ${err.message}`);
}
