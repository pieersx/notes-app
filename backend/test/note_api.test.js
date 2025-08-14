const mongoose = require('mongoose')
const Note = require('../models/note')
const { api, initialNotes, notesInDb, contentInDb } = require('./test_helper')

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(initialNotes)
})

describe('GET /api/notes', () => {
  test('devuelve en formato JSON y status 200', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('devuele todas las notas iniciales', async () => {
    const notes = await notesInDb()
    expect(notes).toHaveLength(initialNotes.length)
  })

  test('incluye un contenido específico', async () => {
    const contents = await contentInDb()
    expect(contents).toContain('HTML is easy')
  })
})

describe('POST /api/notes', () => {
  test('crea nota válida', async () => {
    const newNote = {
      content: 'Testing creates value',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // const notes = await notesInDb()
    // const contents = notes.map((note) => note.content)

    const notes = await notesInDb()
    expect(notes).toHaveLength(initialNotes.length + 1)

    const contents = await contentInDb()
    expect(contents).toContain(newNote.content)
  })

  test('rechaza sin content (400)', async () => {
    const newNote = {
      important: false
    }

    await api.post('/api/notes').send(newNote).expect(400)

    const notes = await notesInDb()
    expect(notes).toHaveLength(initialNotes.length)
  })
})

test('una nota se puede eliminar', async () => {
  const [note] = await notesInDb()
  await api.delete(`/api/notes/${note.id}`).expect(204)

  const notesAfterDelete = await notesInDb()
  expect(notesAfterDelete).toHaveLength(initialNotes.length - 1)
})

test('una nota no se puede eliminar si no existe', async () => {
  await api.delete('/api/notes/1234').expect(400)

  const notesAfterDelete = await notesInDb()
  expect(notesAfterDelete).toHaveLength(initialNotes.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
