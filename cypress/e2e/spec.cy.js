describe('URL Shortener User Flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: "urls"
    })
    cy.visit('http://localhost:3000/')
  })

  it('should be able to visit page and render title and existing URLs', () => {
    cy.get('header').contains('h1', 'URL Shortener')
    cy.get('section').find('.url').should('have.length', 1)

    cy.get('.url').contains('h3', 'Awesome photo')
    cy.get('a').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should be able to render form with proper inputs', () => {
    cy.get('form').find('input').should('have.length', 2)
    cy.get('input[name="title"]').should('be.visible')
    cy.get('input[name="urlToShorten"]').should('be.visible')
  })
})