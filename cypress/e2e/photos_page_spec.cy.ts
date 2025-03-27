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
            cy.get('img').should('be.visible')
            cy.get('h3').should('be.visible')
            cy.get('p').contains(/photos|photo|Empty album/).should('be.visible')
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
    it('shows hover effects on album cards', () => {
      cy.hasAlbums().then((hasAlbums) => {
        if (hasAlbums) {
          const albumCard = cy.get('div.grid > a').first()
          
          // Verify initial state
          albumCard.find('div.bg-opacity-0').should('exist')
          
          // Hover over the card
          albumCard.trigger('mouseover')
          
          // Check for hover effect - can be tricky in Cypress as hover effects are CSS
          // This is a best-effort check that the elements exist that would show on hover
          albumCard.find('span').should('be.visible')
        }
      })
    })
  })
})