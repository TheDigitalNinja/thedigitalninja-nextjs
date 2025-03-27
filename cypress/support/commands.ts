/// <reference types="cypress" />
// ***********************************************
// Custom commands for The Digital Ninja website
// ***********************************************

// Command to check if albums exist on the photos page
Cypress.Commands.add('hasAlbums', () => {
  return cy.get('body').then(($body) => {
    return $body.find('div.grid > a').length > 0
  })
})

// Command to check if photos exist in an album
Cypress.Commands.add('hasPhotos', () => {
  return cy.get('body').then(($body) => {
    // Look for clickable divs that would be photo items
    return $body.find('div.grid > div').length > 0 && 
           !$body.text().includes('No photos found')
  })
})

// Command to get the first album URL from the photos page
Cypress.Commands.add('getFirstAlbumUrl', () => {
  return cy.hasAlbums().then((hasAlbums) => {
    if (hasAlbums) {
      return cy.get('div.grid > a').first().invoke('attr', 'href')
    }
    return null
  })
})

// Command to open a photo modal
Cypress.Commands.add('openPhotoModal', () => {
  cy.hasPhotos().then((hasPhotos) => {
    if (hasPhotos) {
      cy.get('div.grid > div').first().click()
      // Modal is a div with fixed position and z-50 class
      cy.get('div.fixed.z-50').should('be.visible')
    }
    // Don't return anything to avoid mixing sync and async code
  })
})

// Command to close a photo modal
Cypress.Commands.add('closePhotoModal', () => {
  // Use the correct selector for the close button
  cy.get('button[aria-label="Close modal"]').click()
  cy.get('div.fixed.z-50').should('not.exist')
})

declare global {
  namespace Cypress {
    interface Chainable {
      hasAlbums(): Chainable<boolean>
      hasPhotos(): Chainable<boolean>
      getFirstAlbumUrl(): Chainable<string | null>
      openPhotoModal(): Chainable<void>
      closePhotoModal(): Chainable<void>
    }
  }
}