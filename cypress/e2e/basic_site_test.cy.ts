describe('Home Page', () => {
    it('Has correct layout, content, metadata, and schema.', () => {
      const micropost = {
        _id: 'home-test-1',
        _createdAt: '2024-07-01T00:00:00Z',
        content: 'Home micropost smoke test content',
        slug: 'home-micropost',
        images: [],
        tags: ['testing'],
        publishedAt: '2024-07-01T00:00:00Z',
      };

      cy.intercept(
        'GET',
        'https://*.api.sanity.io/**/data/query/**',
        (req) => {
          const isSlugRequest = req.url.includes('%24slug=');
          const body = isSlugRequest ? { result: micropost } : { result: [micropost] };
          req.reply({ statusCode: 200, body });
        },
      ).as('microposts');

      cy.visit('/')
      cy.wait('@microposts')
  
      // Layout
      cy.get('header').should('be.visible')
      cy.get('aside').should('be.visible')
      cy.contains('h1', 'The Digital Ninja').should('be.visible')

      // Content
      cy.contains('h2', 'Recent Blog Posts').should('be.visible')
      cy.contains('h2', 'Recent Blog Posts').parent().find('article').should('have.length.at.least', 1)
      cy.contains('Home micropost smoke test content').should('be.visible')
      cy.contains('View all').should('have.attr', 'href', '/feed')

      // Metadata
      cy.title().should('eq', 'The Digital Ninja - Russell Perkins')
      cy.get('meta[name="description"]').should(
        'have.attr',
        'content',
        'Explore tech insights, software architecture, and AI with Russell Perkins, a seasoned Solutions Architect and IT consultant.'
      )

      // Schema.org data
      cy.get('script[type="application/ld+json"]').should('exist')
      cy.get('script[type="application/ld+json"]').then(($script) => {
        const jsonData = JSON.parse($script.text())
        expect(jsonData['@type']).to.equal('WebSite')
        expect(jsonData.name).to.equal('The Digital Ninja')
        expect(jsonData.mainEntity['@id']).to.equal('https://TheDigital.Ninja')
      })
    })
})


describe('Blog Page', () => {
    it('Has correct layout, content, and can navigate to a post.', () => {
      cy.visit('/blog')
  
      // Layout
      cy.get('header').should('be.visible')
      cy.get('aside').should('be.visible')
      cy.contains('h1', 'Blog Posts').should('be.visible')
  
      // Content
      cy.get('div.space-y-8').should('exist')
      cy.get('div.space-y-8 article').should('have.length.at.least', 1)
      cy.get('div.space-y-8 article').first().within(() => {
        cy.get('h2').should('be.visible')
        cy.get('p').should('have.length.at.least', 2)
      })
  
      // Navigation to a post
      cy.get('div.space-y-8 > a').first().click()
      cy.url().should('include', '/blog/')
    })
})


describe('First Blog Post Page', () => {
    it('Has correct layout, content, metadata, and schema.', () => {
      cy.visit('/blog/first-post')
  
      // Layout
      cy.get('header').should('be.visible')
      cy.get('aside').should('be.visible')
      cy.contains('h1', 'Hello World - Welcome to TheDigital.Ninja').should('be.visible')
  
      // Content
      cy.contains('2024-06-27').should('be.visible')
      cy.get('.prose').within(() => {
        cy.contains('Hello fellow technologists and curious souls!').should('be.visible')
        cy.contains('h2', "What's in Store").should('be.visible')
        cy.contains('h2', 'A Central Hub').should('be.visible')
      })
      cy.get('pre code.language-javascript').should('be.visible')
      cy.get('pre code.language-javascript').should('contain', 'console.log("Hello World!");')
  
      // Metadata
      cy.title().should('eq', 'Hello World - Welcome to TheDigital.Ninja')
      cy.get('meta[name="description"]').should(
        'have.attr',
        'content',
        'Kicking off my new tech blog with a classic Hello World. Join me as I explore app dev, architecture, AI and more.'
      )
  
      // Schema.org data
      cy.get('script[type="application/ld+json"]').should('exist')
      cy.get('script[type="application/ld+json"]').then(($script) => {
        const jsonData = JSON.parse($script.text())
        expect(jsonData['@type']).to.equal('BlogPosting')
        expect(jsonData.headline).to.equal('Hello World - Welcome to TheDigital.Ninja')
        expect(jsonData.author.name).to.equal('Russell Perkins')
      })
    })
})


describe('About Page', () => {
    it('Has correct layout, content, metadata, and schema.', () => {
      cy.visit('/about')
  
      // Layout
      cy.get('header').should('be.visible')
      cy.get('aside').should('be.visible')
  
      // Content
      cy.contains('h1', 'About Russell Perkins').should('be.visible')
      cy.contains(
        'p',
        'Russell Perkins is a seasoned Solutions Architect and IT consultant'
      ).should('be.visible')
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
  
      // Metadata
      cy.title().should('eq', 'About Russell Perkins - The Digital Ninja')
      cy.get('meta[name="description"]').should(
        'have.attr',
        'content',
        'Learn about Russell Perkins, a seasoned Solutions Architect and IT consultant with a journey from rural Missouri to the forefront of technology.'
      )
  
      // Schema.org data
      cy.get('script[type="application/ld+json"]').should('exist')
      cy.get('script[type="application/ld+json"]').then(($script) => {
        const jsonData = JSON.parse($script.text())
        expect(jsonData['@type']).to.equal('AboutPage')
        expect(jsonData.mainEntity['@type']).to.equal('Person')
        expect(jsonData.mainEntity.name).to.equal('Russell Perkins')
      })
    })
})
