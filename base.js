const fs = require('fs')
const {promisify} = require('util')
const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const {yellow, blue, green, red, gray} = require('chalk')
const log = console.log.bind(console)

module.exports = {
    yellow, blue, green, red, gray,
    log,
    writeFile,
    readFile
}
