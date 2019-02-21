const argv = process.argv.slice(2)
const pkg = require('./package')
const { gray, green, yellow } = require('./src/base')
const { docopt } = require('./src/docopt')

const doc = `
-------------------------------------------------
${green('A font-end CLI utility to compile/compress/format')}
${green('that makes your life easy ✔︎')}                 ${yellow(pkg.version)}
-------------------------------------------------
Usage:
  aui compile <file>... [options]
  aui compress <file>... [options]
  aui format <file>... [options]
  aui -h | --help | --version

Options:
  -d DIST, --dist=DIST              ${gray('Destnation directory path. [default: ./]')}
  -w, --watch                       ${gray('Watch mode when compiling. [default: false]')}
  -W, --write                       ${gray('Write to local file system. [default: false]')}
  -r NAME, --reserved=NAME          ${gray('Compress reserved identifier. [default: define,require,exports]')}
  -p WIDTH, --print-width=WIDTH     ${gray('Specify the line length that the printer will wrap on. [default: 80]')}
  -t WIDTH, --tab-width=WIDTH       ${gray('Specify the number of spaces per indentation-level. [default: 4]')}
  -S, --no-semi                     ${gray('Print semicolons at the ends of statements. [default: true]')}
  -s, --single-quote                ${gray('Use single quotes instead of double quotes. [default: true]')}
`

function processCMD(cmd) {
    return Object.assign({}, cmd, {
        files: cmd['<file>'],
        watch: cmd['--watch'],
        write: cmd['--watch'] || cmd['--write'],
        reserved: cmd['--reserved'].split(','),
        formatOptions: {
            printWidth: Number(cmd['--print-width']),
            tabWidth: Number(cmd['--tab-width']),
            semi: !cmd['--no-semi'],
            singleQuote: cmd['--single-quote']
        }
    })
}

function main(cmd) {
    if (cmd.compile) {
        require('./src/compile')(cmd)
    }
    if (cmd.compress) {
        require('./src/compress')(cmd)
    }
    if (cmd.format) {
        require('./src/format')(cmd)
    }
}

main(processCMD(docopt(doc, { argv, help: true, })))

