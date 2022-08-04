#!/usr/bin/env node
const chalk = require('chalk'); //负责命令行不同文本颜色显示
const clear = require('clear'); //负责清空命令行
const figlet = require('figlet'); //可以在命令行中以ASCII ART形式显示文本  使用纯文本显示图像
const commander = require('commander');//实现命令行工具最主要的库

commander
    .command('hello')
    .description('Hello world')
    .action(() => {
        console.log(chalk.magenta(figlet.textSync('big apple orange', {
            hosrizontalLayout: 'full'
        })));
        console.log("恭喜你，发现了宝藏命令行工具！🎉🎉🎉")
        console.log("---输入 youdao [英文/中文] 可快速中英文翻译")
        console.log("---如  youdao orange")
    });

function getIndexArgv() {
    const args = process.argv;
    return [args[0], args[1], "hello"];
}
commander.parse(getIndexArgv());
