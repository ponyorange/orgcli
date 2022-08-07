#!/usr/bin/env node
const chalk = require('chalk'); //负责命令行不同文本颜色显示
const Table = require('cli-table2'); // 表格输出
const figlet = require('figlet'); //可以在命令行中以ASCII ART形式显示文本  使用纯文本显示图像
const {program} = require('commander'); //实现命令行工具最主要的库
const t2t = require("./lib/t2t")
const cssvar = require("./lib/cssvar")
program
    .command('hello')
    .description('orgcli 介绍')
    .version('0.1.0')
    .action(() => {
        console.log(chalk.magenta(figlet.textSync('orgtool-cli', {
            hosrizontalLayout: 'full'
        })));
        console.log("恭喜你，发现了宝藏命令行工具！🎉🎉🎉");
        const row0 = {"命令": ["介绍", "用法", "示例"]}
        const row1 = {"youdao": ["快速中英文翻译", "youdao [英文/中文]", "youdao orange"]}
        const row2 = {"orgcli t2t": ["快速时间戳转换", "orgcli t2t [时间/时间戳]", "orgcli t2t 2022-12-12 12:12"]}
        const row3 = {"orgcli cssvar": ["用于转换css变量", "详情请查看：","https://www.npmjs.com/package/orgtool-cli"]}
        const table = new Table();
        table.push(row0);table.push(row1);table.push(row2);table.push(row3);
        console.log(table.toString());
    });

program
    .command('t2t <time>')
    .description('时间（戳）输入')
    .version('0.1.0')
    .action((time) => {
        t2t(time)
    });

program
    .command('cssvar <cssFilepath>')
    .description('样式文件变量转换，请输入目标路径：')
    .version('0.1.0')
    .action((cssFilepath) => {
        if (cssFilepath === "/**orange-cli-cssvar-no-filepath**/"){
            console.log("没有路径，请输入orgcli cssvar [css文件路径]");
            console.log("如：orgcli cssvar ./index.css");
        }else {
            cssvar(cssFilepath)
        }
    });

program
    .command('help')
    .description('orgcli 帮助')
    .version('0.1.0')
    .action(() => {
        console.log("orgcli 无此命令，支持命令如下：");
        const row0 = {"命令": ["介绍", "用法", "示例"]}
        const row1 = {"youdao": ["快速中英文翻译", "youdao [英文/中文]", "youdao orange"]}
        const row2 = {"orgcli t2t": ["快速时间戳转换", "orgcli t2t [时间/时间戳]", "orgcli t2t 2022-12-12 12:12"]}
        const row3 = {"orgcli cssvar": ["用于转换css变量", "详情请查看：","https://www.npmjs.com/package/orgtool-cli"]}
        const table = new Table();
        table.push(row0);table.push(row1);table.push(row2);table.push(row3);
        console.log(table.toString());
    });

function getIndexArgv() {
    const args = process.argv;
    if (args.length === 2) return [args[0], args[1], "hello"];
    else if (args[2]==="t2t"){
        if (args.length === 4){
            return args
        }else {
            return [args[0], args[1], "t2t",args[3] + " " + args[4]];
        }
    }else if (args[2]==="cssvar"){
        if (args.length === 3){
            return [args[0],args[1],args[2],"/**orange-cli-cssvar-no-filepath**/"]
        }
        return args
    }
    else return [args[0],args[1],"help"]
}

program.parse(getIndexArgv());
