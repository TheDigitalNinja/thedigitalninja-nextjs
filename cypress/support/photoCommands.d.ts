// Type definitions for custom Cypress commands
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Check if albums exist on the photos page
     * @return {Chainable<boolean>}
     * @example cy.hasAlbums()
     */
    hasAlbums(): Chainable<boolean>;

    /**
     * Check if photos exist in an album
     * @return {Chainable<boolean>}
     * @example cy.hasPhotos()
     */
    hasPhotos(): Chainable<boolean>;

    /**
     * Get the first album URL from the photos page
     * @return {Chainable<string | null>}
     * @example cy.getFirstAlbumUrl()
     */
    getFirstAlbumUrl(): Chainable<string | null>;

    /**
     * Open the photo modal
     * @return {Chainable<void>}
     * @example cy.openPhotoModal()
     */
    openPhotoModal(): Chainable<void>;

    /**
     * Close the photo modal
     * @return {Chainable<void>}
     * @example cy.closePhotoModal()
     */
    closePhotoModal(): Chainable<void>;
  }
}