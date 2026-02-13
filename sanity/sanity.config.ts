import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { schema } from './schema'
import { structure } from './desk-structure'
import { sanityDataset, sanityProjectId } from '../src/lib/sanity-config'

export default defineConfig({
  name: 'default',
  title: 'The Digital Ninja',
  
  projectId: sanityProjectId,
  dataset: sanityDataset,
  
  plugins: [
    deskTool({ structure }), 
    visionTool(), 
    media()
  ],
  
  schema,
  
  basePath: '/studio',
})