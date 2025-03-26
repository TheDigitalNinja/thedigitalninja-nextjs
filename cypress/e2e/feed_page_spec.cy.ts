describe('Feed Page', () => {
  beforeEach(() => {
    cy.visit('/feed')
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays the correct title', () => {
      cy.contains('h1', 'Feed').should('be.visible')
    })
  })

  describe('Content', () => {
    it('displays microposts with dates', () => {
      cy.get('article').should('exist')
      cy.get('time').should('exist')
    })

    it('displays tags for microposts', () => {
      cy.contains('#webdev').should('exist')
    })
  })

  describe('Navigation', () => {
    it('has a link to the Feed page in the sidebar', () => {
      cy.visit('/')
      cy.contains('Feed').should('exist')
      cy.contains('Feed').click()
      cy.url().should('include', '/feed')
    })
  })
})