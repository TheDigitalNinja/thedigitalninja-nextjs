import sanitizeHtml from 'sanitize-html'

const allowedHtmlTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'img',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'pre',
  'code',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
]

const allowedHtmlAttributes: sanitizeHtml.IOptions['allowedAttributes'] = {
  ...sanitizeHtml.defaults.allowedAttributes,
  a: ['href', 'name', 'target', 'rel'],
  code: ['class'],
  img: ['src', 'alt', 'title', 'width', 'height', 'loading'],
}

export const sanitizeRenderedHtml = (dirtyHtml: string): string => sanitizeHtml(dirtyHtml, {
  allowedTags: allowedHtmlTags,
  allowedAttributes: allowedHtmlAttributes,
  allowedSchemes: ['http', 'https', 'mailto'],
  allowProtocolRelative: false,
})

export const serializeJsonForHtml = (value: unknown): string => JSON.stringify(value)
  .replace(/</g, '\\u003c')
  .replace(/>/g, '\\u003e')
  .replace(/&/g, '\\u0026')
  .replace(/\u2028/g, '\\u2028')
  .replace(/\u2029/g, '\\u2029')
