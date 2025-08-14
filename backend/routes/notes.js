const express = require('express')
const {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
} = require('../controllers/notes.js')

const router = express.Router()

// GET /api/notes - Obtener todas las notas
router.get('/', getAllNotes)

// GET /api/notes/:id - Obtener una nota por ID
router.get('/:id', getNoteById)

// POST /api/notes - Crear una nueva nota
router.post('/', createNote)

// PUT /api/notes/:id - Actualizar una nota
router.put('/:id', updateNote)

// DELETE /api/notes/:id - Eliminar una nota
router.delete('/:id', deleteNote)

module.exports = router
