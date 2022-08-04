#! /usr/local/bin/node
const chalk = require('chalk'); //负责命令行不同文本颜色显示
const clear = require('clear'); //负责清空命令行
const figlet = require('figlet'); //可以在命令行中以ASCII ART形式显示文本  使用纯文本显示图像
const commander = require('commander');//实现命令行工具最主要的库

commander
  .command('init')
  .description('Hello world')
  .action(() => {
    clear();
    console.log(chalk.magenta(figlet.textSync('big orange', {
      hosrizontalLayout: 'full'
    })));
  });

commander.parse(process.argv);
if (!commander.args.length) {
  commander.help();
}
