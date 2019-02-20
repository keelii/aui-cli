const sass = require('sass')
const chokidar = require('chokidar')

const {
    log,
    yellow, blue, green, red, gray,
    writeFile,
    readFile
} = require('./base')

class SassCompile {
    constructor(cmd) {
        this.cmd = cmd

        this.start()
    }
    get isMutilFile() {
        return this.cmd.files.length > 1
    }
    start() {
        const files = this.cmd.files

        if (this.cmd.watch) {
            this.watchFiles(files)
        } else {
            this.compileFiles(files)
        }
    }
    getFileName(file) {
        return file.replace(/\.(scss|sass)$/, '.css')
    }
    watchFiles(files) {
        chokidar.watch(files, { persistent: true })
        .on('change', this.compile.bind(this))
        .on('add', path => log(`File ${path} has been added`))
        .on('unlink', path => log(`[${red('DELETED')}] ${gray(path)}`))
        .on('change', (p, stats) => log(p, stats))
        .on('ready', () => log(`\n${blue('> Target files are watching ︎✔')}\n`))
    }
    async compileFiles(files) {
        let count = 0
        for (let file of files) {
            try {
                await this.compile(file)
                count++
            } catch (error) {
                log(error)
            }
        }
        if (this.isMutilFile) {
            log(`\n\nAll: ${yellow(files.length)}, Done: ${green(count)}, Fail: ${red(files.length - count)}`)
        }
    }
    async compile(file) {
        const result = await sass.renderSync({file})

        if (this.cmd.write) {
            await writeFile(this.getFileName(file), result.css)
            console.log(`[${green('CHANGED')}] ${gray(file)}`)
        } else {
            if (this.isMutilFile) {
                log(`---------- ${yellow(file)} ----------`)
            }
            log(result.css.toString())
        }
    }
}

module.exports = function(cmd) {
    new SassCompile(cmd)
}