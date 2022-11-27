const yargs = require('yargs')
const pcg = require('./package.json')
const {addNote, printNotes, removeNotes} = require('./notes.controller')

yargs.version(pcg.version)

yargs.command({
    command: 'add',
    describe: 'Add new note to list',
    builder: {
        title: {
            type: 'string',
            describe: 'Note title',
            demandOption: true
        }
    },
    async handler({title}) {
        await addNote(title)
    }
})

yargs.command({
    command: 'list',
    describe: 'Print all notes',
    async handler() {
        await printNotes()
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note by ID',
    builder: {
        id: {
            type: 'string',
            describe: 'ID',
            demandOption: true
        }
    },
    async handler({id}) {
        await removeNotes(id)
    }
})

yargs.parse()