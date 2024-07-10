describe('First Blog Post Page', () => {
  beforeEach(() => {
    cy.visit('/blog/first-post')
  })

  describe('Layout', () => {
    it('displays the header', () => {
      cy.get('header').should('be.visible')
    })

    it('displays the sidebar', () => {
      cy.get('aside').should('be.visible')
    })

    it('displays the correct title', () => {
      cy.contains('h1', 'Hello World - Welcome to TheDigital.Ninja').should('be.visible')
    })
  })

  describe('Content', () => {
    it('displays the post date', () => {
      cy.contains('2024-06-27').should('be.visible')
    })

    it('displays the post content', () => {
      cy.get('.prose').within(() => {
        cy.contains('Hello fellow technologists and curious souls!').should('be.visible')
        cy.contains('h2', "What's in Store").should('be.visible')
        cy.contains('h2', 'A Central Hub').should('be.visible')
      })
    })

    it('displays a code block', () => {
      cy.get('pre code.language-javascript').should('be.visible')
      cy.get('pre code.language-javascript').should('contain', 'console.log("Hello World!");')
    })
  })

  describe('Metadata', () => {
    it('has the correct page title', () => {
      cy.title().should('eq', 'Hello World - Welcome to TheDigital.Ninja')
    })

    it('has the correct meta description', () => {
      cy.get('meta[name="description"]').should('have.attr', 'content', 'Kicking off my new tech blog with a classic Hello World. Join me as I explore app dev, architecture, AI and more.')
    })
  })

  describe('Schema.org data', () => {
    it('includes schema.org JSON-LD data', () => {
      cy.get('script[type="application/ld+json"]').should('exist')
      cy.get('script[type="application/ld+json"]').then(($script) => {
        const jsonData = JSON.parse($script.text())
        expect(jsonData['@type']).to.equal('BlogPosting')
        expect(jsonData.headline).to.equal('Hello World - Welcome to TheDigital.Ninja')
        expect(jsonData.author.name).to.equal('Russell Perkins')
      })
    })
  })
})
