const fs = require('fs')
const path = require('path')

class Creator {
    constructor(cmd) {
        this.cmd = cmd

        this.dispatch(this.cmd)
    }
    dispatch(cmd) {
        const cmdTypes = cmd.ignoreTypes.length > 0 ? cmd.ignoreTypes : ['git']
        const types = [...new Set(cmdTypes)]
        
        types.forEach(this.create.bind(this))
    }
    create(type) {
        const cwd = process.cwd()
        const fileType = {
            'git': '.gitignore',
            'npm': '.npmignore'
        }
        const source = path.join(__dirname, '../ignore', fileType[type])
        const dest = path.join(cwd, fileType[type])
        
        try {
            fs.copyFileSync(source, dest)
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = function(cmd) {
    new Creator(cmd)
}