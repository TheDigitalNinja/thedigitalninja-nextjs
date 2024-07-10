describe('Blog Page', () => {
  beforeEach(() => {
    cy.visit('/blog')
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays the correct title', () => {
      cy.contains('h2', 'Blog Posts').should('be.visible')
    })
  })

  describe('Content', () => {
    it('displays a list of blog posts', () => {
      cy.get('ul.space-y-6').should('exist')
      cy.get('ul.space-y-6 li').should('have.length.at.least', 1)
    })

    it('displays blog post information', () => {
      cy.get('ul.space-y-6 li').first().within(() => {
        cy.get('h2').should('be.visible')
        cy.get('p').should('have.length', 2)
      })
    })
  })

  describe('Navigation', () => {
    it('has working links to individual blog posts', () => {
      cy.get('ul.space-y-6 li').first().find('a').click()
      cy.url().should('include', '/blog/')
    })
  })

})
