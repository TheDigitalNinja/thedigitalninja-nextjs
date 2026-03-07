const invalidSlugPostFile = 'cypress unsafe slug.md'
const invalidSlugPostContents = `---
title: Invisible Unsafe Post
date: "2099-12-31"
excerpt: This post should never be rendered.
sanityImageId: ''
tags:
  - security
readTime: 1
---
This content should never be reachable.
`

const sanitizedContentPostFile = 'cypress-sanitized-content.md'
const sanitizedContentPostContents = `---
title: Cypress Sanitized Content
date: "2099-12-30"
excerpt: Verifies that unsafe stored content cannot inject markup.
sanityImageId: ''
tags:
  - security
readTime: 2
---
# Sanitized Post

This paragraph should stay visible.

</script><script>window.__schemaXss = true</script>

<img src="x" onerror="window.__blogImageXss = true" alt="bad image" />
<script>window.__blogScriptXss = true</script>
<a href="javascript:window.__blogHrefXss = true" id="bad-link">bad link</a>
<div onclick="window.__blogClickXss = true">click me</div>
`

type SanitizationTestWindow = Cypress.AUTWindow & {
  __schemaXss: boolean;
  __blogImageXss: boolean;
  __blogScriptXss: boolean;
  __blogHrefXss: boolean;
  __blogClickXss: boolean;
}

describe('Blog content sanitization', () => {
  afterEach(() => {
    cy.task('deleteTestPost', invalidSlugPostFile)
    cy.task('deleteTestPost', sanitizedContentPostFile)
  })

  it('skips posts whose filenames do not produce a safe blog slug', () => {
    cy.task('writeTestPost', {
      fileName: invalidSlugPostFile,
      contents: invalidSlugPostContents,
    })

    cy.visit('/blog')

    cy.contains('Invisible Unsafe Post').should('not.exist')
    cy.get('a[href*="cypress%20unsafe%20slug"], a[href*="cypress unsafe slug"]').should('not.exist')

    cy.get('aside').within(() => {
      cy.contains('Invisible Unsafe Post').should('not.exist')
    })

    cy.visit('/')

    cy.contains('Recent Blog Posts')
      .parent()
      .within(() => {
        cy.contains('Invisible Unsafe Post').should('not.exist')
      })
  })

  it('sanitizes rendered markdown and safely serializes JSON-LD content', () => {
    cy.task('writeTestPost', {
      fileName: sanitizedContentPostFile,
      contents: sanitizedContentPostContents,
    })

    cy.visit('/blog/cypress-sanitized-content', {
      onBeforeLoad(win) {
        const testWindow = win as SanitizationTestWindow
        testWindow.__schemaXss = false
        testWindow.__blogImageXss = false
        testWindow.__blogScriptXss = false
        testWindow.__blogHrefXss = false
        testWindow.__blogClickXss = false
      },
    })

    cy.contains('h1', 'Cypress Sanitized Content').should('be.visible')
    cy.contains('.prose', 'This paragraph should stay visible.').should('be.visible')

    cy.get('.prose script').should('not.exist')
    cy.get('.prose a[href^="javascript:"]').should('not.exist')
    cy.get('.prose [onclick]').should('not.exist')
    cy.get('.prose img[alt="bad image"]').should('not.have.attr', 'onerror')

    cy.get('script[type="application/ld+json"]').should('have.length', 1)
    cy.window().its('__schemaXss').should('equal', false)
    cy.window().its('__blogImageXss').should('equal', false)
    cy.window().its('__blogScriptXss').should('equal', false)
    cy.window().its('__blogHrefXss').should('equal', false)
    cy.window().its('__blogClickXss').should('equal', false)
  })
})
