const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const POSTS_DIR = path.join(process.cwd(), 'posts')
const OUTPUT_FILE = path.join(POSTS_DIR, 'README.md')
const SITE_BASE_URL = 'https://TheDigital.Ninja/Blog'
const EXCLUDED_FILES = new Set(['readme.md', 'example.md'])

function isPostFile(fileName) {
  const lowerName = fileName.toLowerCase()
  return lowerName.endsWith('.md') && !EXCLUDED_FILES.has(lowerName)
}

function normalizeExcerpt(rawExcerpt) {
  if (typeof rawExcerpt !== 'string') return ''
  return rawExcerpt.replace(/\s+/g, ' ').trim()
}

function loadPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  return fs
    .readdirSync(POSTS_DIR)
    .filter(isPostFile)
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/i, '')
      const fullPath = path.join(POSTS_DIR, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      const date = typeof data.date === 'string' ? data.date : ''
      const parsedDate = date ? new Date(date) : new Date(0)

      return {
        slug,
        fileName,
        title: typeof data.title === 'string' ? data.title.trim() : slug,
        excerpt: normalizeExcerpt(data.excerpt),
        dateLabel: date || 'Unknown date',
        sortValue: parsedDate.getTime(),
      }
    })
    .sort((a, b) => b.sortValue - a.sortValue)
}

function buildReadmeContent(posts) {
  const lines = [
    '# Blog Posts',
    '',
    '_Auto-generated during build. Do not edit manually._',
    '',
  ]

  if (posts.length === 0) {
    lines.push('No posts found.')
    return lines.join('\n')
  }

  posts.forEach((post) => {
    lines.push(`## [${post.title}](${post.fileName})`)
    //lines.push(`- Date: ${post.dateLabel}`)
    lines.push(`> ${post.excerpt || '(none provided)'}`)
    lines.push('')
  })

  return lines.join('\n')
}

function main() {
  const posts = loadPosts()
  const content = buildReadmeContent(posts)
  fs.writeFileSync(OUTPUT_FILE, content, 'utf8')
  console.log(`[posts README] Generated index with ${posts.length} entr${posts.length === 1 ? 'y' : 'ies'}.`)
}

main()

