describe('Photos Page', () => {
  beforeEach(() => {
    cy.visit('/photos')
  })

  describe('Layout', () => {
    it('displays the header with correct title', () => {
      cy.get('header').should('be.visible')
      cy.contains('h1', 'Photos').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays album grid section with heading', () => {
      cy.contains('h2', 'Photo Albums').should('be.visible')
      cy.get('div.grid').should('exist')
    })
  })

  describe('Albums Display', () => {
    it('displays albums with cover images if available', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (hasAlbums) {
          cy.get('div.grid > a').first().within(() => {
            // Look for either an image or a "No cover image" message
            cy.get('div.aspect-square').should('exist')
            cy.get('h3').should('be.visible')
            // Description is optional in the new Sanity schema
            // so we don't test for it specifically
          })
        }
      })
    })

    it('shows appropriate message if no albums are available', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (!hasAlbums) {
          cy.contains('No albums found').should('be.visible')
        }
      })
    })

    it('album links have the correct href format', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (hasAlbums) {
          cy.get('div.grid > a').first()
            .should('have.attr', 'href')
            .and('match', /^\/photos\/[\w-]+$/)
        }
      })
    })
  })

  describe('Navigation', () => {
    it('has a working link to an album page if albums exist', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (hasAlbums) {
          cy.get('div.grid > a').first().click()
          cy.url().should('include', '/photos/')
        }
      })
    })

    it('has a working navigation back to home', () => {
      cy.contains('a', 'Home').click()
      cy.url().should('eq', Cypress.config().baseUrl + '/')
    })
  })

  describe('UI Interactions', () => {
    it('has album cards with hover transition classes', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (hasAlbums) {
          // Get the link element
          cy.get('div.grid > a').first().as('albumLink')
          
          // Check that the link has the block class
          cy.get('@albumLink').should('have.class', 'block')
          
          // Check that its child div has transition classes
          cy.get('@albumLink').find('div').first()
            .should('have.class', 'transition-transform')
        }
      })
    })
  })
})