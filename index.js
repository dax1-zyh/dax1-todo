const { program } = require('commander');

program
    .option('-x, --xxx', 'option example')

program
    .command('add <task...>')
    .description('add a task')
    .action((x) => {
        const words = x.join(' ')
        console.log(words)
    });

program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        console.log('all clear')
    });

program.parse(process.argv);

