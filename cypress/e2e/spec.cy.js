describe('URL Shortener User Flows', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: "urls"
    })
    cy.visit('http://localhost:3000/')
  })

  it('should be able to visit page and render title and existing shortened URLs', () => {
    cy.get('header').contains('h1', 'URL Shortener')
    cy.get('section').find('.url').should('have.length', 1)

    cy.get('.url').contains('h3', 'Awesome photo')
    cy.get('a').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('p').should('contain', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should be able to visit the page and render form with proper inputs', () => {
    cy.get('form').find('input').should('have.length', 2)
    cy.get('input[name="title"]').should('be.visible')
    cy.get('input[name="urlToShorten"]').should('be.visible')
  })

  it('should update form to display information when user types into input fields', () => {
    cy.get('input[name="title"]').type('Dog image').should('have.value', 'Dog image')
    cy.get('input[name="urlToShorten"]').type('https://www.pexels.com/photo/closeup-photo-of-brown-and-black-dog-face-406014/').should('have.value', 'https://www.pexels.com/photo/closeup-photo-of-brown-and-black-dog-face-406014/')
  })

  it('should display new shortened URL to page once user fills out form inputs and clicks button to submit', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        title: 'Dog image',
        long_url: 'https://www.pexels.com/photo/closeup-photo-of-brown-and-black-dog-face-406014/',
        short_url: 'http://localhost:3001/useshorturl/2'
      }
    })
    cy.get('input[name="title"]').type('Dog image')
    cy.get('input[name="urlToShorten"]').type('https://www.pexels.com/photo/closeup-photo-of-brown-and-black-dog-face-406014/')
    cy.contains('Shorten Please!').click()

    cy.get('section').find('.url').should('have.length', 2)
    cy.get('.url').last().should('contain', 'http://localhost:3001/useshorturl/2')
  })

  it('should display an error message if data cannot load due to 400 error', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 400
    })
    cy.visit('http://localhost:3000/')
    cy.get('p').should('contain', 'Something went wrong! Please try again later.')
  })

  it('should display an error message if data cannot load due to 500 error', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500
    })
    cy.visit('http://localhost:3000/')
    cy.get('p').should('contain', 'Something went wrong! Please try again later.')
  })
})