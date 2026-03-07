import fs from 'fs/promises'
import path from 'path'
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    setupNodeEvents(on, config) {
      on('task', {
        async writeTestPost({
          fileName,
          contents,
        }: {
          fileName: string;
          contents: string;
        }) {
          const postPath = path.join(config.projectRoot, 'posts', fileName)
          await fs.writeFile(postPath, contents, 'utf8')
          return null
        },
        async deleteTestPost(fileName: string) {
          const postPath = path.join(config.projectRoot, 'posts', fileName)
          await fs.rm(postPath, { force: true })
          return null
        },
      })
    },
  },
})
