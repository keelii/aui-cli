const prettier = require("prettier")

const {
    log,
    yellow, blue, green, red, gray,
    writeFile,
    readFile
} = require('./base')

class CodeFormatter {
    constructor(cmd) {
        this.cmd = cmd

        this.start()
    }
    get isMutilFile() {
        return this.cmd.files.length > 1
    }
    start() {
        const files = this.cmd.files

        this.formatFiles(files)
    }
    async formatFiles(files) {
        let count = 0
        for (let file of files) {
            try {
                await this.format(file)
                count++
            } catch (error) {
                log(error)
            }
        }
        if (this.isMutilFile) {
            log(`\n\nAll: ${yellow(files.length)}, Done: ${green(count)}, Fail: ${red(files.length - count)}`)
        }
    }
    getFileName(file) {
        return file.replace(/\.js$/, '.min.js')
    }
    async format(file) {
        const options = { 
            mangle: {
                reserved: this.cmd.reserved
            },
            format: {},
        }
        const code = await readFile(file)
        const result = prettier.format(code.toString(), { 
            ...this.cmd.formatOptions,
            write: this.cmd.write,
            parser: "babel" 
        })

        if (this.cmd.write) {
            await writeFile(file, result)
            console.log(`[${green('UPDATED')}] ${gray(file)}`)
        } else {
            if (this.isMutilFile) {
                log(`---------- ${yellow(file)} ----------`)
            }
            log(result)
        }
    }
}

module.exports = function(cmd) {
    new CodeFormatter(cmd)
}