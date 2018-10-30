const test = require('ava');
const qieman = require('.');

test('qieman', (t) => {
  t.deepEqual(qieman, 'hello qieman');
});
