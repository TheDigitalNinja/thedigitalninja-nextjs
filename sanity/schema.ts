import { type SchemaTypeDefinition } from 'sanity'

// Define schemas for our content types
export const album = {
  name: 'album',
  title: 'Album',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Album Title',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'albumPhoto',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
            {
              name: 'takenAt',
              title: 'Date Taken',
              type: 'datetime',
            }
          ],
          preview: {
            select: {
              title: 'title',
              media: 'image'
            }
          }
        }
      ]
    }
  ]
}

// Micropost schema for social-media like posts
export const micropost = {
  name: 'micropost',
  title: 'Micropost',
  type: 'document',
  fields: [
    {
      name: 'content',
      title: 'Status',
      type: 'text', // Using simple text field for easier status updates
      description: 'Enter your status update here (like a Facebook status or tweet)',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: { content?: string }) => {
          // Create slug from the first few words of content or the current date
          const content = doc.content || '';
          const text = content.split(' ').slice(0, 5).join('-').toLowerCase();
          return text || new Date().toISOString().split('T')[0];
        },
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    },
    {
      name: 'tags',
      title: 'Tags/Hashtags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Place Name',
          type: 'string',
          description: 'Enter the name of the place (e.g., "XYZ Steak House")'
        },
        {
          name: 'url',
          title: 'Place URL',
          type: 'url',
          description: 'Optional link to the place website or Google Maps'
        }
      ]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule: any) => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'content',
      media: 'images.0'
    },
    prepare({ title, media }: { title?: string; media?: any }) {
      const shortTitle = title ? (title.length > 50 ? title.substring(0, 50) + '...' : title) : 'New Micropost';
      return {
        title: shortTitle,
        media: media
      };
    }
  }
}

// Keep the original photo schema for backward compatibility
export const photo = {
  name: 'photo',
  title: 'Photo',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'album',
      title: 'Album',
      type: 'reference',
      to: [{ type: 'album' }],
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'takenAt',
      title: 'Date Taken',
      type: 'datetime',
    }
  ]
}

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [album, photo, micropost],
}