describe('URL Shortener User Flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: "urls"
    })
  })
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})