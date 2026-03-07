describe('Feed Page', () => {
  it('Has correct layout, content, and micropost navigation.', () => {
    cy.visit('/feed')

    // Feed layout
    cy.get('header').should('be.visible')
    cy.get('aside').should('be.visible')
    cy.contains('h1', 'Feed').should('be.visible')

    // Feed content
    cy.get('article', { timeout: 20000 }).should('exist')
    cy.get('time', { timeout: 20000 }).should('exist')

    // Open the first micropost from feed by clicking the card (anchor wraps the article)
    cy.get('main a[href^="/feed/"]', { timeout: 20000 })
      .first()
      .scrollIntoView()
      .click()
    cy.url({ timeout: 20000 }).should('match', /\/feed\/[^/]+$/)

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
    cy.get('article').then(($article) => {
      if ($article.find('[data-testid="micropost-tag"]').length > 0) {
        cy.get('[data-testid="micropost-tag"]').each(($tag) => {
          cy.wrap($tag).should('contain.text', '#')
        })
      }
    })

    // Navigation back to feed
    cy.contains('Back to Feed', { timeout: 20000 }).click()
    cy.url().should('include', '/feed')
    cy.url().should('not.include', '/feed/')
  })
})
