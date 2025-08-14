const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      <span>{note.content}</span>
      <button onClick={toggleImportance} style={{ marginLeft: '10px' }}>
        {label}
      </button>
    </li>
  )
}

export default Note
