describe('Photos and albums', () => {
  let albumUrl = ''

  const formatAlbumName = (url: string) => {
    if (!url) return ''
    const slug = url.split('/').pop()
    if (!slug) return ''
    return slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  }

  before(() => {
    cy.visit('/photos')
    cy.getFirstAlbumUrl().then((url) => {
      expect(url, 'first album url').to.be.a('string').and.not.be.empty
      albumUrl = url as string
    })
  })

  it('shows photos page layout, albums, and navigation', () => {
    cy.get('header').should('be.visible')
    cy.contains('h1', 'Photos').should('be.visible')
    cy.get('aside').should('be.visible')
    cy.contains('h2', 'Photo Albums').should('be.visible')
    cy.get('div.grid').should('exist')

    cy.hasAlbums().then((hasAlbums) => {
      if (hasAlbums) {
        cy.get('div.grid > a').first().as('firstAlbum')

        cy.get('@firstAlbum')
          .should('have.attr', 'href')
          .and('match', /^\/photos\/[\w-]+$/)

        cy.get('@firstAlbum').find('div.aspect-square').should('exist')
        cy.get('@firstAlbum').find('h3').should('be.visible')

        cy.get('@firstAlbum').should('have.class', 'block')
        cy.get('@firstAlbum')
          .find('div')
          .first()
          .should('have.class', 'transition-transform')

        cy.get('@firstAlbum').click({ force: true })
        cy.location('pathname', { timeout: 10000 }).should(
          'match',
          /\/photos\/[\w-]+$/
        )
        cy.go('back')
        cy.url().should('include', '/photos')
      } else {
        cy.contains('No albums found').should('be.visible')
      }
    })

    cy.contains('a', 'Home').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })

  it('shows album content and photo modal interactions', function () {
    expect(albumUrl, 'albumUrl from photos page').to.be.a('string').and.not.be.empty

    cy.visit(albumUrl)

    cy.get('header h1').should('be.visible').and('not.be.empty')
    cy.get('div.grid').should('exist')

    cy.hasPhotos().then((hasPhotos) => {
      if (hasPhotos) {
        cy.get('div.grid > div').first().within(() => {
          cy.get('img').should('be.visible')
        })

        cy.get('div.grid > div').first().click()
        cy.get('div.fixed.z-50').should('be.visible')
        cy.get('div.fixed.z-50 button[aria-label="Close modal"]').should('be.visible')

        const albumName = formatAlbumName(albumUrl)
        if (albumName) {
          cy.get('div.fixed.z-50')
            .invoke('text')
            .then((text) => {
              expect(text.toLowerCase()).to.include(albumName.toLowerCase())
            })
        }

        cy.get('div.grid > div').then(($photos) => {
          if ($photos.length > 1) {
            cy.get('div.fixed.z-50 button[aria-label="Previous photo"]').should('be.visible')
            cy.get('div.fixed.z-50 button[aria-label="Next photo"]').should('be.visible')
          }
        })

        cy.get('body').should('have.css', 'overflow').and('match', /hidden|clip/)

        cy.get('button[aria-label="Close modal"]').click({ force: true })
        cy.get('div.fixed.z-50').should('not.exist')

        cy.wait(100)
        cy.get('body').should('not.have.css', 'overflow', 'hidden')
      } else {
        cy.contains('No photos found').should('be.visible')
      }
    })

    cy.contains('a', 'Photos').click()
    cy.url().should('include', '/photos')

    const albumSlug = albumUrl.split('/').pop()
    if (albumSlug) {
      cy.url().should('not.include', albumSlug)
    }

    cy.contains('a', 'Home').click()
    cy.url().should('eq', `${Cypress.config().baseUrl}/`)
  })
})
