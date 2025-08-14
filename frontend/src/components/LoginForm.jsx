import PropTypes from 'prop-types'
import { useState } from 'react'
import Togglable from './Togglable'

const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    loginUser({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <Togglable buttonLabel='Login in'>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            username
            <input
              data-cy='username'
              type='text'
              value={username}
              name='Username'
              placeholder='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              data-cy='password'
              type='password'
              value={password}
              name='Password'
              placeholder='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button data-cy='login-button' type='submit'>
            Login
          </button>
        </form>
      </div>
    </Togglable>
  )
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default LoginForm
