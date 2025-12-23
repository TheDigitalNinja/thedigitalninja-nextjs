/**
 * @file src/lib/sanity-microposts.ts
 * @fileoverview Provides functions to retrieve and process micropost data from Sanity CMS.
 */

import { groq } from 'next-sanity';
import { sanityClient } from './sanity-client';

// Define types for Sanity micropost data
export type SanityMicropostImage = {
  _key: string;
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type SanityLocation = {
  name?: string;
  url?: string;
};

export type SanityMicropost = {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  content: string;
  slug: {
    current: string;
  };
  images?: SanityMicropostImage[];
  tags?: string[];
  location?: SanityLocation;
  publishedAt: string;
};

// Type for processed micropost data used in components
export type MicropostData = {
  id: string;
  content: string;
  slug: string;
  images: string[];
  tags: string[];
  location?: {
    name?: string;
    url?: string;
  };
  date: string;
};

// Get all microposts sorted by date (newest first)
export async function getSortedMicropostsData(limit?: number): Promise<MicropostData[]> {
  // Query to fetch microposts sorted by date
  const query = groq`*[_type == "micropost"] | order(publishedAt desc) ${
    limit ? `[0...${limit}]` : ''
  } {
    _id,
    _createdAt,
    content,
    "slug": slug.current,
    "images": images[].asset->{
      url,
      metadata {
        dimensions
      }
    }.url,
    tags,
    location,
    publishedAt
  }`;

  try {
    const microposts = await sanityClient.fetch<{
      _id: string;
      _createdAt: string;
      content: string;
      slug: string;
      images?: string[];
      tags?: string[];
      location?: SanityLocation;
      publishedAt: string;
    }[]>(query);

    if (!microposts || microposts.length === 0) {
      return [];
    }

    return microposts.map(post => ({
      id: post._id,
      content: post.content || '',
      slug: post.slug || '',
      images: post.images || [],
      tags: post.tags || [],
      location: post.location,
      date: post.publishedAt || post._createdAt
    }));
  } catch (error) {
    console.error('Error fetching microposts:', error);
    throw error;
  }
}

// Get a specific micropost by slug
export async function getMicropostBySlug(slug: string): Promise<MicropostData | null> {
  const query = groq`*[_type == "micropost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    content,
    "slug": slug.current,
    "images": images[].asset->{
      url,
      metadata {
        dimensions
      }
    }.url,
    tags,
    location,
    publishedAt
  }`;

  const post = await sanityClient.fetch<any | null>(query, { slug });
  
  if (!post) return null;
  
  return {
    id: post._id,
    content: post.content || '',
    slug: post.slug || '',
    images: post.images || [],
    tags: post.tags || [],
    location: post.location,
    date: post.publishedAt || post._createdAt
  };
}

// Get a specific micropost by ID
export async function getMicropostById(id: string): Promise<MicropostData | null> {
  const query = groq`*[_type == "micropost" && _id == $id][0] {
    _id,
    _createdAt,
    content,
    "slug": slug.current,
    "images": images[].asset->{
      url,
      metadata {
        dimensions
      }
    }.url,
    tags,
    location,
    publishedAt
  }`;

  const post = await sanityClient.fetch<any | null>(query, { id });
  
  if (!post) return null;
  
  return {
    id: post._id,
    content: post.content || '',
    slug: post.slug || '',
    images: post.images || [],
    tags: post.tags || [],
    location: post.location,
    date: post.publishedAt || post._createdAt
  };
}

// Get all micropost slugs for dynamic routes
export async function getAllMicropostSlugs() {
  const query = groq`*[_type == "micropost"] {
    "slug": slug.current
  }`;

  const slugs = await sanityClient.fetch<{ slug: string }[]>(query);
  
  return slugs.map(({ slug }) => ({
    id: slug
  }));
}