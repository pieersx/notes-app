Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteAppUser', JSON.stringify(body))
    cy.visit('/')
  })
})

Cypress.Commands.add('createNote', ({ content, important }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND')}/notes`,
    body: { content, important },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedNoteAppUser')).token
      }`
    }
  })

  cy.visit('/')
})
