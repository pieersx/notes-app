import { useEffect, useState } from 'react'
import Footer from './components/Footer'
import LoginForm from './components/LoginForm'
import Note from './components/Note'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import loginService from './services/login'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    noteService
      .getAllNote()
      .then((notes) => {
        setNotes(notes)
      })
      .catch((error) => {
        setErrorMessage('Error fetching notes from server')

        console.error('Error fetching notes:', error)
        setTimeout(() => setErrorMessage(null), 3000)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const addNote = (noteObject) => {
    if (noteObject.content.trim() === '') {
      setErrorMessage('La nota no puede estar vacía')
      setTimeout(() => setErrorMessage(null), 3000)
      return
    }
    setErrorMessage(null)

    noteService
      .createNote(noteObject)
      .then((newNote) => {
        setNotes((prevNotes) => prevNotes.concat(newNote))
      })
      .catch((error) => {
        setErrorMessage('Error al crear la nota. Inténtalo de nuevo.')
        console.error('Error creating note:', error)
      })
  }

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .updateNote(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const loginUser = async (loginData) => {
    try {
      const user = await loginService.login(loginData)
      console.log(user)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      noteService.setToken(user.token)
      setUser(user)
    } catch (error) {
      console.error('Error logging in:', error)

      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
    noteService.setToken(null)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {user ? (
        <NoteForm addNote={addNote} handleLogout={handleLogout} />
      ) : (
        <LoginForm loginUser={loginUser} />
      )}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>

      <ol>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ol>

      <Footer />
    </div>
  )
}

export default App
