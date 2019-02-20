const doc = `
-------------------------------------------------
A font-end CLI utility to compile/compress/format
that makes your life easy ✔︎
-------------------------------------------------
Usage:
  aui compile [options] <file>... [--watch]
  aui compress [options] <file>...
  aui format [options] <file>...
  aui -h | --help | --version

Options:
  -d DIST, --dist=DIST              Destnation directory path. [default: ./]
  -w, --write                       Write to local file system. [default: false]
  -r NAME, --reserved=NAME          Compress reserved identifier. [default: define,require,exports]
  -p WIDTH, --print-width=WIDTH     Specify the line length that the printer will wrap on. [default: 80]
  -t WIDTH, --tab-width=WIDTH       Specify the number of spaces per indentation-level. [default: 4]
  -s, --no-semi                     Print semicolons at the ends of statements. [default: true]
  --single-quote                    Use single quotes instead of double quotes. [default: true]
`

const argv = process.argv.slice(2)
const { docopt } = require('./docopt')
const cmd = processCMD(docopt(doc, { argv, help: true, }))

function processCMD(cmd) {
    return Object.assign({}, cmd, {
        files: cmd['<file>'],
        watch: cmd['--watch'],
        write: cmd['--watch'] || cmd['--write'],
        reserved: cmd['--reserved'].split(','),
        format: {
            printWidth: Number(cmd['--print-width']),
            tabWidth: Number(cmd['--tab-width']),
            semi: !cmd['--no-semi'],
            singleQuote: cmd['--single-quote']
        }
    })
}

async function main(cmd) {
    if (cmd.compile) {
        require('./compile')(cmd)
    }
    if (cmd.compress) {
        require('./compress')(cmd)
    }
    if (cmd.format) {
        require('./format')(cmd)
    }
}

console.log(`
---------
${JSON.stringify(cmd, null, 2)}
---------
`)

main(cmd)

