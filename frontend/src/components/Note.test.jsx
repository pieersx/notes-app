import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renderiza el contenido de la nota', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  render(<Note note={note} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )

  expect(element).toBeDefined()
})

test('al hacer click en el botón se llama al handle una vez', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }
  const mockHandle = vi.fn()

  render(<Note note={note} toggleImportance={mockHandle} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandle.mock.calls).toHaveLength(1)
})
