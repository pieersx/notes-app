const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user')

const usersRouter = express.Router()

// GET /api/users - Obtener todos los usuarios
usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('notes', {
      content: 1,
      important: 1
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// POST /api/users - Crear usuario
usersRouter.post('/', async (req, res, next) => {
  try {
    const { username, name, password } = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter
