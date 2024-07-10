describe('Page Tests', () => {
  it('Home page loads with correct elements', () => {
    cy.visit('/')
    cy.get('header').should('be.visible')
    cy.get('aside').should('be.visible')
    cy.contains('h1', 'The Digital Ninja').should('be.visible')
  })

  it('Navigates to About page', () => {
    cy.visit('/')
    cy.contains('About').click()
    cy.url().should('include', '/about')
    cy.contains('h1', 'About Russell Perkins').should('be.visible')
  })
})