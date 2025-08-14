const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const User = require('../models/user')

const api = supertest(app)

const initialNotes = [
  {
    content: 'HTML is easy',
    important: false
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true
  }
]

// Recupera todos los notes en la base de datos
const notesInDb = async () => {
  const notes = await Note.find({})
  return notes.map((note) => note.toJSON())
}

// Recupera todos los contenidos de los notes en la base de datos
const contentInDb = async () => {
  const notes = await notesInDb()
  return notes.map((note) => note.content)
}

// Recupera un ID que no existe en la base de datos
const nonExistingId = async () => {
  const note = new Note({
    content: 'temporary to remove',
    important: false
  })
  await note.save()

  const id = note._id.toString()
  await Note.findByIdAndDelete(id)
  return id
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  api,
  initialNotes,
  nonExistingId,
  notesInDb,
  usersInDb,
  contentInDb
}
