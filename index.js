const db = require('./db.js')
const inquirer = require('inquirer')

module.exports.add = async (title) => {
    // 读取之前的任务
    const list = await db.read()
    // 往里面添加一个 title 任务
    list.push({title, done: false})
    // 存储任务到文件
    await db.write(list)
}

module.exports.clear = async () => {
    await db.write([])
}

function markAsDone(list, index) {
    list[index].done = true
    db.write(list)
}

function markAsUndone(list, index) {
    list[index].done = false
    db.write(list)
}

function updateTitle(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '新的标题',
        default: list[index].title
    }).then(answer3 => {
        list[index].title = answer3.title
        db.write(list)
    })
}

function remove(list, index) {
    list.splice(index, 1)
    db.write(list)
}

function askForAction(list, index) {
    inquirer.prompt({
        type: 'list',
        name: 'action',
        message: '请选择操作',
        choices: [
            {name: '退出', value: 'quit'},
            {name: '标记为已完成', value: 'markAsDone'},
            {name: '标记为未完成', value: 'markAsUndone'},
            {name: '改标题', value: 'updateTitle'},
            {name: '删除', value: 'remove'},
        ]
    }).then(answer2 => {
        switch (answer2.action) {
            case 'markAsDone':
                markAsDone(list, index)
                break;
            case 'markAsUndone':
                markAsUndone(list, index)
                break;
            case 'updateTitle':
                updateTitle(list, index)
                break;
            case 'remove':
                remove(list, index)
                break;
        }
    })
}

function askForCreateTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'title',
        message: '输入任务名',
    }).then(answer => {
        list.push({
            title: answer.title,
            done: false
        })
        db.write(list)
    })
}

function printTasks(list) {
    inquirer
        .prompt({
            type: 'list',
            name: 'index',
            message: '选择你想操作的任务',
            choices: [{name: '退出', value: '-1'}, {name: '创建任务', value: '-2'}, ...list.map((task, index) => {
                return {
                    name: `${task.done ? '[已完成]' : '[未完成]'}-${index}-${task.title}`,
                    value: (index).toString()
                }
            })]
        })
        .then((answer) => {
            const index = parseInt(answer.index)
            if (index >= 0) {   // 选中了一个任务
                askForAction(list, index)
            } else if (index === -2) {  // 创建任务
                askForCreateTask(list)
            }
        });
}

module.exports.showAll = async () => {
    // 读取之前的任务
    const list = await db.read()
    // 打印之前的任务
    printTasks(list)
}
