describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays the correct title', () => {
      cy.contains('h1', 'The Digital Ninja').should('be.visible')
    })
  })

  describe('Navigation', () => {
    it('has a working link to the About page', () => {
      cy.contains('About').click()
      cy.url().should('include', '/about')
    })

  })
})