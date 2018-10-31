# qieman

> API client for qieman (且慢)

## INSTALL
```bash
npm install qieman
# or
yarn add qieman
```

## EXAMPLE
```js
const qieman = require('qieman');

console.log(qieman.version);

(async () => {

  try {
    const longwin = await qieman.longwin();
    console.log(longwin);
  } catch (error) {
    console.error(error);
  }

})();

```
