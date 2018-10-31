const test = require('ava');
const qieman = require('.');
const { version } = require('./package.json');

test('qieman.version', (t) => {
  t.deepEqual(qieman.version, version);
});

test('qieman.longwin()', async (t) => {
  const longwin = await qieman.longwin();
  t.deepEqual(longwin.name, '长赢指数投资计划');
});
