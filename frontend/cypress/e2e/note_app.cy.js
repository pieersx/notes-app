describe('Note app', function () {
  beforeEach(() => {
    cy.visit('http://localhost:5173')

    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      username: 'pieers',
      name: 'Pieers',
      password: 'xanax'
    })
  })

  it('Se puede abrir la página principal', function () {
    cy.contains('Notes')
    cy.contains(
      'Note app, Department of Computer Science, University of Helsinki 2024'
    )
  })

  it('Se puede abrir el formulario de inicio de sesión', function () {
    cy.contains('Login in').click()
  })

  it('El usuario puede iniciar sesión', () => {
    cy.contains('Login in').click()
    cy.get('[data-cy="username"]').type('pieers')
    cy.get('[data-cy="password"]').type('xanax')
    cy.get('[data-cy="login-button"]').click()

    cy.contains('New note')
  })

  it('El inicio de sesión falla con una contraseña incorrecta', () => {
    cy.contains('Login in').click()
    cy.get('[data-cy="username"]').type('pieers')
    cy.get('[data-cy="password"]').type('wrongpassword')
    cy.get('[data-cy="login-button"]').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')

    cy.get('html').should('not.contain', 'New note')
  })

  describe('Al iniciar sesión', () => {
    beforeEach(() => {
      cy.login({ username: 'pieers', password: 'xanax' })
    })

    it('El usuario puede crear una nueva nota', () => {
      cy.contains('New note').click()
      cy.get('[data-cy="note-input"]').type('a note created by cypress')
      cy.contains('Save').click()

      cy.contains('a note created by cypress')
    })

    describe('y existe una nota', () => {
      beforeEach(() => {
        cy.createNote({
          content: 'a note created by cypress',
          important: true
        })
      })

      it('El usuario puede cambiar la importancia de una nota', () => {
        cy.contains('a note created by cypress')
          .parent()
          .find('button')
          .as('theButton')
        cy.get('@theButton').contains('make not important').click()

        cy.get('@theButton').contains('make important')
      })
    })

    describe('y existe varias notas', () => {
      beforeEach(() => {
        cy.login({ username: 'pieers', password: 'xanax' })
        cy.createNote({ content: 'first note', important: false })
        cy.createNote({ content: 'second note', important: false })
        cy.createNote({ content: 'third note', important: false })
      })

      it('uno de ellos puede hacerse importante', () => {
        cy.contains('second note').parent().find('button').as('theButton') // que hace? :
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })

  describe.only('cuando el usuario está autenticado', () => {
    beforeEach(() => {
      cy.login({ username: 'pieers', password: 'xanax' })
    })

    it('El usuario puede cerrar sesión', () => {
      cy.contains('New note').click()
      cy.contains('Logout').click()

      cy.get('html').should('contain', 'Login in')
    })
  })
})
