#! /usr/bin/env node
const {
    program
} = require('commander');
const Table = require('cli-table2') // 表格输出
const superagent = require('superagent') // http请求

program
    .allowUnknownOption()
    .version('0.0.1')
    .usage('translator <cmd> [input]')

const url = `http://fanyi.youdao.com/openapi.do?keyfrom=toaijf&key=868480929&type=data&doctype=json&version=1.1`;

program
    .command('query <word>')
    .description('翻译输入')
    .action((word) => {
        superagent.get(url)
            .query({
                q: word
            })
            .end(  (err, res)=> {

                if (err){
                    console.log('excuse me, try again')
                    return false
                }
                let data = JSON.parse(res.text);
                let result ={};
                // 返回的数据处理
                if (data.basic) {
                    result[word] = data['basic']['explains'];
                } else if (data.translation) {
                    result[word] = data['translation'];
                } else {
                    console.error('翻译失败，请检查翻译词或句子是否包含特殊符号。');
                }
                // 输出表格
                let table = new Table();
                table.push(result);
                console.log(table.toString());
            })
    });

function getArgv(){
    const args = process.argv
    let wordStr = ""
    for (let i = 2; i < args.length; i++){
        wordStr = wordStr + args[i] + " "
    }
    return [args[0],args[1],"query",wordStr.trim()]
}
program.parse(getArgv());
