/**
 * @file src/lib/posts.ts
 * @fileoverview Provides functions to retrieve and sort blog post data from markdown files.
 * @description This module includes utilities for reading post metadata, sorting posts,
 *              and retrieving individual post content.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

// Define a type for the post metadata
type PostMetadata = {
  date: string;
  title: string;
  excerpt: string;
  cloudinaryImageId: string;
  tags: string[];
  readTime: number;
  og: Record<string, string>;
}

type PostData = PostMetadata & {
  slug: string;
}

type FullPostData = PostData & {
  content: string;
}

export function getSortedPostsData(limit?: number): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...(matterResult.data as PostMetadata)
    }
  })
  // Sort posts by date
  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  // Return limited number of posts if limit is provided
  return limit ? sortedPosts.slice(0, limit) : sortedPosts
}

export function getPostData(slug: string): FullPostData {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the slug and content
  return {
    slug,
    content: matterResult.content,
    ...(matterResult.data as PostMetadata)
  }
}