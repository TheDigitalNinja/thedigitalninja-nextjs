import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schema } from './schema'
import { structure } from './desk-structure'

export default defineConfig({
  name: 'default',
  title: 'The Digital Ninja',
  
  projectId: 'nx08bxy1', // Replace with your actual Sanity project ID
  dataset: 'production',
  
  plugins: [
    deskTool({ structure }), 
    visionTool(), 
    media()
  ],
  
  schema,
  
  basePath: '/studio',
})