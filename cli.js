#!/usr/bin/env node
const {program} = require('commander');
const api = require('./index.js')

program
    .option('-x, --xxx', 'option example')

program
    .command('add <task...>')
    .description('add a task')
    .action((x) => {
        const words = x.join(' ')
        api.add(words).then(() => console.log('添加成功'), () => console.log('添加失败'))
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => console.log('清除完毕'), () => console.log('清除失败'))
    });

program
    .command('show')
    .description('show all tasks')
    .action(() => {
        api.showAll()
    });

program.parse(process.argv);

// if (process.argv.length === 2) {
//     // 说明用户直接运行node cli.js
//     api.showAll()
// }
