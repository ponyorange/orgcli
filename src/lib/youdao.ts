#! /usr/bin/env node
const { program } = require("commander");
const Table = require("cli-table2"); // 表格输出
const superagent = require("superagent"); // http请求
const getArgv = require("../utils/getArgv");
const getYouDaoRequestUrl = require("../utils/youdao");

program.allowUnknownOption().version("0.0.1").usage("translator <cmd> [input]");

program
  .command("query <word>")
  .description("翻译输入")
  .action((word) => {
    console.log("翻译中...");
    superagent.get(getYouDaoRequestUrl(word)).end((err, res) => {
      if (err) {
        console.log("excuse me, try again");
        return false;
      }
      let data = JSON.parse(res.text);
      let result = {};
      // 返回的数据处理
      if (data.basic) {
        result[word] = data["basic"]["explains"];
      } else if (data.translation) {
        result[word] = data["translation"];
      } else {
        console.error("翻译失败，请检查翻译词或句子是否包含特殊符号。");
      }

      // 输出表格
      let table = new Table();
      table.push(result);
      if (data.web) {
        data.web.forEach((item) => {
          table.push({ [item.key]: item.value });
        });
      }
      console.log(table.toString());
    });
  });

program.command("help").action(() => {
  console.log("没有查询词，请输入youdao [查询词]");
  console.log("如：youdao orange");
});

program.parse(getArgv("query"));

export default void 0;
