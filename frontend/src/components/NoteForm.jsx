import { useRef, useState } from 'react'
import Togglable from './Togglable'

const NoteForm = ({ addNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('')
  const noteFormRef = useRef()

  const handleSubmit = (event) => {
    event.preventDefault()

    const noteObject = {
      content: newNote,
      important: true
    }

    addNote(noteObject)
    setNewNote('')
    noteFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel='New note' ref={noteFormRef}>
      <h3>Create a new note</h3>

      <form onSubmit={handleSubmit}>
        <input
          data-cy='note-input'
          type='text'
          onChange={({ target }) => {
            setNewNote(target.value)
          }}
          value={newNote}
          placeholder='Escribe una nota'
        />
        <button type='submit'>Save</button>
      </form>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Togglable>
  )
}

export default NoteForm
