const fs = require('fs/promises')
const path = require('path')
const notesPath = path.join(__dirname, 'db.json')
const chalk = require('chalk')


async function addNote(title) {
    const notes = await getNotes()
    const note = {
        title,
        id: Date.now().toString()
    }
    notes.push(note)
    await fs.writeFile(notesPath, JSON.stringify(notes))
    console.log(chalk.green('Note was added'))
}

async function changeNote(title, id) {
    const notes = await getNotes()
    const filteredNote = notes.filter(note => note.id === id)
    const changedNote = {...filteredNote, title: title}
    notes.push(changedNote)
    await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function getNotes() {
    const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
    const notes = await getNotes()
    console.log(chalk.bgBlue('Here is the list of notes'))
    notes.forEach(note => {
        console.log(chalk.blue(note.title), chalk.green(note.id))
    })
}

async function removeNotes(id) {
    const notes = await getNotes()
    const filtered = notes.filter(note => note.id !== id)
    await fs.writeFile(notesPath, JSON.stringify(filtered))
}

module.exports = {
    addNote,
    getNotes,
    removeNotes,
    changeNote
}