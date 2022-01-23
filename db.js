const homedir = require('os').homedir()     // 系统home目录
const home = process.env.HOME || homedir    // 自己设定的home变量，若没有，则使用默认home目录
const fs = require('fs')    // 引入fs
const p = require('path')   // nodejs中拼路径的方法
const dbPath = p.join(home, '.todo')    //数据库路径

const db = {
    read(path = dbPath) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, {flag: 'a+'}, (error, data) => {
                if (error) {
                    return reject(error)
                }
                let list
                try {
                    list = JSON.parse(data.toString())  // 之前有任务就直接添加到list
                } catch (error2) {
                    list = []   // 之前没有任务就新建list
                }
                resolve(list)

            })
        })
    },
    write(list, path = dbPath) {
        return new Promise((resolve, reject) => {
            const string = JSON.stringify(list)
            fs.writeFile(path, string + '\n', (error) => {
                if (error) {
                    return reject(error)
                }
                resolve()

            })
        })
    }
}
module.exports = db
