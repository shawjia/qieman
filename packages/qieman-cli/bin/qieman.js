#!/usr/bin/env node

const program = require('commander');
const qieman = require('qieman');
const pkg = require('../package.json');

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
          })),
        );

        return acc;
      }, []);


      console.log(['code', 'name', 'short', 'unit'].join('\t'));
      console.log(all.map(v => [v.code, v.name, v.short, v.unit].join('\t')).join('\n'));

      // https://nodejs.org/api/console.html#console_console_table_tabulardata_properties
      // Added in: v10.0.0
      if (console.table) {
        console.log();

        console.table(all.map(({ code, unit }) => ({ code, unit })));
      }
    } catch (error) {
      console.error(error);
    }
  });

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
