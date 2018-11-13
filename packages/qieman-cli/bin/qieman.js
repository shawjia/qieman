#!/usr/bin/env node

const program = require('commander');
const qieman = require('qieman');
const pkg = require('../package.json');

function formatNum(num, precision = 2) {
  return ((num > 0 ? '+' : '') + (num * 100).toFixed(precision)).padStart(7);
}

program.version(pkg.version);

program
  .command('longwin')
  .alias('l')
  .description('长赢计划')
  .action(async () => {
    try {
      const res = await qieman.longwin();

      const all = res.composition.map(v => v.compList).reduce((acc, arr) => {
        acc.push(
          ...arr.filter(item => 'fund' in item).map(item => ({
            code: item.fund.fundCode,
            name: item.fund.fundName,
            short: item.variety,
            unit: item.planUnit,
            buy: item.unitValue,
            now: `${item.fund.nav} ${formatNum(item.dailyReturn)}% (${item.fund.navDate})`,
            profit: `${formatNum(item.profit || item.accProfit)}%`,
          })),
        );

        return acc;
      }, []);


      console.log(['code', 'name', 'short', 'unit', 'buy', 'now', 'profit']
        .join('\t'));
      console.log(all.map(v => [
        v.code, v.name, v.short, v.unit, v.buy, v.now, v.profit,
      ].join('\t')).join('\n'));

      // https://nodejs.org/api/console.html#console_console_table_tabulardata_properties
      // Added in: v10.0.0
      if (console.table) {
        console.log();

        console.table(all.map(({
          code, unit, buy, now, profit, short,
        }) => ({
          code, unit, buy, now, profit, short,
        })));
      }
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
