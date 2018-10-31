const crypto = require('crypto');
const got = require('got');

const { version } = require('./package.json');

// 长赢数据
const longwinLink = 'https://qieman.com/pmdj/v2/long-win/plan?classify=true';

function createSign() {
  const ts = Date.now();
  const hash = crypto.createHash('sha256')
    .update(Math.floor(1.01 * ts).toString(), 'utf8')
    .digest('hex');

  return ts + hash.toUpperCase().substring(0, 32);
}

createSign();

async function request(link, body = {}) {
  try {
    const headers = { 'x-sign': createSign() };
    const res = await got(link, {
      json: true, headers, body, method: 'get',
    });

    if (res.body) {
      return res.body;
    }

    throw new Error('No Data');
  } catch (err) {
    throw err;
  }
}

const qieman = {
  version,
  request,
  longwin: async () => request(longwinLink),
};

module.exports = qieman;
