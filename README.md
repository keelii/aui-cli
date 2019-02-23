## ➜ aui --help
```
-------------------------------------------------
A font-end CLI utility to compile/compress/format
that makes your life easy ✔︎                0.0.1
-------------------------------------------------

Usage:
  aui compile <file>... [options]
  aui compress <file>... [options]
  aui format <file>... [options]
  aui -h | --help

Options:
  -d DIST, --dist=DIST              Destnation directory path. [default: ./]
  -w, --watch                       Watch mode when compiling. [default: false]
  -W, --write                       Write to local file system. [default: false]
  -r NAME, --reserved=NAME          Compress reserved identifier. [default: define,require,exports]
  -p WIDTH, --print-width=WIDTH     Specify the line length that the printer will wrap on. [default: 80]
  -t WIDTH, --tab-width=WIDTH       Specify the number of spaces per indentation-level. [default: 4]
  -S, --no-semi                     Print semicolons at the ends of statements. [default: true]
  -s, --single-quote                Use single quotes instead of double quotes. [default: true]
```