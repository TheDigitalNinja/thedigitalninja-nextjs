describe('Events Page', () => {
  it('Has correct layout and can navigate to an event.', () => {
    cy.visit('/events');

    // Events layout
    cy.get('header').should('be.visible');
    cy.get('aside').should('be.visible');
    cy.contains('h1', 'Events').should('be.visible');

    cy.get('main', { timeout: 20000 }).then(($main) => {
      // If there are no events yet, we just verify the empty state.
      if ($main.text().includes('No events yet')) {
        cy.contains('No events yet', { timeout: 20000 }).should('be.visible');
        return;
      }

      // Click the first event in the list
      cy.get('main a[href^="/events/"]', { timeout: 20000 })
        .first()
        .scrollIntoView()
        .click();

      cy.url({ timeout: 20000 }).should('match', /\/events\/[^/]+$/);

      // Event detail layout
      cy.get('header').should('be.visible');
      cy.get('aside').should('be.visible');
      cy.contains('← Back to Events', { timeout: 20000 })
        .should('be.visible')
        .and('have.attr', 'href', '/events');

      // Event detail content
      cy.get('main h1', { timeout: 20000 }).should('be.visible');
      cy.get('main time', { timeout: 20000 }).should('exist');

      // If the event date is in the past, the "Get Tickets" link should be hidden
      cy.get('main time')
        .first()
        .invoke('attr', 'dateTime')
        .then((dateTime) => {
          if (!dateTime) return;
          const eventDate = new Date(`${dateTime}T00:00:00`);
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          if (eventDate < today) {
            cy.contains('a', 'Get Tickets').should('not.exist');
          }
        });
    });
  });
});

