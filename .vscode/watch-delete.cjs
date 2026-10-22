// Commits (and pushes) when a file or folder is deleted; saves are handled by Run on Save.
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '..');
const ignored = /(^|[\/])(\.git|\.claude|node_modules|dist[\w-]*)([\/]|$)/;
let timer;
let deleted = [];

fs.watch(root, { recursive: true }, (eventType, filename) => {
  if (!filename || eventType !== 'rename' || ignored.test(filename)) return;
  if (fs.existsSync(path.join(root, filename))) return;
  deleted.push(path.basename(filename));
  clearTimeout(timer);
  timer = setTimeout(() => {
    const names = [...new Set(deleted)].slice(0, 3).join(', ');
    deleted = [];
    spawnSync('node', [path.join(__dirname, 'auto-commit.cjs'), names, 'deleted'], {
      cwd: root,
      stdio: 'inherit',
    });
  }, 1500);
});

console.log('Watching for deletions in', root);
