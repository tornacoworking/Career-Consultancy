const { execFileSync } = require('child_process');

const git = (...args) => execFileSync('git', args, { encoding: 'utf8' });
const file = process.argv[2] || 'files';
const action = process.argv[3] || 'saved';

try {
  if (git('status', '--porcelain').trim()) {
    const time = new Date().toLocaleString('sv-SE').slice(0, 16);
    git('add', '-A');
    git('commit', '-q', '-m', `Auto-commit: ${action} ${file} (${time})`);
  }
  if (!process.env.AUTO_COMMIT_NO_PUSH) git('push', '-q', '-u', 'origin', 'HEAD');
} catch (err) {
  console.error(`auto-commit skipped: ${err.message}`);
}
