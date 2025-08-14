const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: {
    type: String,
    required: true,
    minlength: 5,
  },
  important: Boolean,
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
})

// Transformar el objeto para que _id se convierta en id y eliminar __v
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Note = model('Note', noteSchema)

module.exports = Note
