describe('Individual Micropost Page', () => {
  beforeEach(() => {
    // First visit the feed page to get a micropost link
    cy.visit('/feed')
    // Click on the first permalink
    cy.contains('Permalink').first().click()
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays a back to feed link', () => {
      cy.contains('Back to Feed').should('be.visible')
      cy.contains('Back to Feed').should('have.attr', 'href', '/feed')
    })
  })

  describe('Content', () => {
    it('displays the post content', () => {
      cy.get('article').should('exist')
      cy.get('article .text-lg').should('exist')
    })

    it('displays the date', () => {
      cy.get('time').should('exist')
    })

    it('displays tags if present', () => {
      // This test may need to be conditional depending on your test data
      cy.get('article').then($article => {
        // Only check for tags if they exist in the current post
        if ($article.find('span').length > 0) {
          cy.get('span').contains('#').should('exist')
        }
      })
    })
  })

  describe('Navigation', () => {
    it('can navigate back to the feed page', () => {
      cy.contains('Back to Feed').click()
      cy.url().should('include', '/feed')
      cy.url().should('not.include', '/feed/')
    })
  })
})