describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })
  })

  describe('Content', () => {
    it('displays the correct title', () => {
      cy.contains('h1', 'About Russell Perkins').should('be.visible')
    })

    it('displays the introduction paragraph', () => {
      cy.contains('p', 'Russell Perkins is a seasoned Solutions Architect and IT consultant').should('be.visible')
    })

    it('displays section headers', () => {
      const sections = [
        'Early Beginnings',
        'From Hobbyist to Innovator',
        'Entrepreneurial Spirit',
        'Professional Evolution',
        'Personal Philosophy',
        'Current Focus'
      ]
      sections.forEach(section => {
        cy.contains('h2', section).should('be.visible')
      })
    })
  })

  describe('Metadata', () => {
    it('has the correct page title', () => {
      cy.title().should('eq', 'About Russell Perkins - The Digital Ninja')
    })

    it('has the correct meta description', () => {
      cy.get('meta[name="description"]').should('have.attr', 'content', 'Learn about Russell Perkins, a seasoned Solutions Architect and IT consultant with a journey from rural Missouri to the forefront of technology.')
    })
  })

  describe('Schema.org data', () => {
    it('includes schema.org JSON-LD data', () => {
      cy.get('script[type="application/ld+json"]').should('exist')
      cy.get('script[type="application/ld+json"]').then(($script) => {
        const jsonData = JSON.parse($script.text())
        expect(jsonData['@type']).to.equal('AboutPage')
        expect(jsonData.mainEntity['@type']).to.equal('Person')
        expect(jsonData.mainEntity.name).to.equal('Russell Perkins')
      })
    })
  })
})