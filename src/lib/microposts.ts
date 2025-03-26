/**
 * @file src/lib/microposts.ts
 * @fileoverview Provides functions to retrieve and sort microblog post data from markdown files.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const micropostsDirectory = path.join(process.cwd(), 'microposts')

// Define a type for the micropost metadata
export type MicropostMetadata = {
  date: string;
  content: string;
  imageUrl?: string;
  tags?: string[];
}

export type MicropostData = MicropostMetadata & {
  id: string;
}

export function getAllMicropostIds() {
  if (!fs.existsSync(micropostsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(micropostsDirectory);
  return fileNames.map(fileName => {
    return {
      id: fileName.replace(/\.md$/, '')
    }
  });
}

export function getSortedMicropostsData(limit?: number): MicropostData[] {
  // Get file names under /microposts
  if (!fs.existsSync(micropostsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(micropostsDirectory)
  const allMicropostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(micropostsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      content: matterResult.content,
      ...(matterResult.data as Omit<MicropostMetadata, 'content'>)
    }
  })
  
  // Sort microposts by date, newest first
  const sortedMicroposts = allMicropostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })

  // Return limited number of microposts if limit is provided
  return limit ? sortedMicroposts.slice(0, limit) : sortedMicroposts
}

export function getMicropostData(id: string): MicropostData {
  const fullPath = path.join(micropostsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as Omit<MicropostMetadata, 'content'>)
  }
}