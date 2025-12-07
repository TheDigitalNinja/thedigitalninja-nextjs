describe('Feed Page', () => {
  it('Has correct layout, content, and micropost navigation.', () => {
    // The API route can take a few seconds to compile on first hit.
    cy.intercept('GET', '/api/microposts').as('microposts')

    cy.visit('/feed')
    cy.wait('@microposts', { timeout: 20000 })

    // Feed layout
    cy.get('header').should('be.visible')
    cy.get('aside').should('be.visible')
    cy.contains('h1', 'Feed').should('be.visible')

    // Feed content
    cy.get('article', { timeout: 20000 }).should('exist')
    cy.get('time', { timeout: 20000 }).should('exist')

    // Open the first micropost from feed
    cy.contains('Permalink').first().click()

    // Micropost layout
    cy.get('header').should('be.visible')
    cy.get('aside').should('be.visible')
    cy.contains('Back to Feed', { timeout: 20000 })
      .should('be.visible')
      .and('have.attr', 'href', '/feed')

    // Micropost content
    cy.get('article', { timeout: 20000 }).should('exist')
    cy.get('article .text-lg', { timeout: 20000 }).should('exist')
    cy.get('time', { timeout: 20000 }).should('exist')
    cy.get('article').then($article => {
      if ($article.find('span').length > 0) {
        cy.get('span').contains('#').should('exist')
      }
    })

    // Navigation back to feed
    cy.contains('Back to Feed', { timeout: 20000 }).click()
    cy.url().should('include', '/feed')
    cy.url().should('not.include', '/feed/')
  })
})
