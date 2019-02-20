var UglifyJS = require("uglify-js")

const {
    log,
    yellow, blue, green, red, gray,
    writeFile,
    readFile
} = require('./base')

class JSCompressor {
    constructor(cmd) {
        this.cmd = cmd

        this.start()
    }
    get isMutilFile() {
        return this.cmd.files.length > 1
    }
    start() {
        const files = this.cmd.files

        this.compressFiles(files)
    }
    async compressFiles(files) {
        let count = 0
        for (let file of files) {
            try {
                await this.compress(file)
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
    async compress(file) {
        if (/\.min\.js$/.test(file)) {
            throw new Error('Already compressed')
        }
        const options = { 
            mangle: {
                reserved: this.cmd.reserved
            },
            compress: {},
        }
        const code = await readFile(file)
        const result = UglifyJS.minify(code.toString(), options)

        if (this.cmd.write) {
            await writeFile(this.getFileName(file), result.code)
            console.log(`[${green('CHANGED')}] ${gray(file)}`)
        } else {
            if (this.isMutilFile) {
                log(`\n---------- ${yellow(file)} ----------`)
            }
            process.stdout.write(result.code)
        }
    }
}

module.exports = function(cmd) {
    new JSCompressor(cmd)
}