/**
 * @file src/lib/sanity-events.ts
 * @fileoverview Provides functions to retrieve event data from Sanity CMS.
 */

import { groq } from 'next-sanity';
import { sanityClient } from './sanity-client';
import type { SanityImage } from './sanity-photo-albums';

type SanityImageDimensions = {
  width: number;
  height: number;
  aspectRatio?: number;
};

export type EventData = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  date: string; // ISO string from Sanity (date or datetime)
  locationName: string;
  picture?: SanityImage;
  pictureUrl?: string;
  pictureDimensions?: SanityImageDimensions;
  eventUrl?: string;
  ticketsUrl?: string;
  time?: string;
  locationUrl?: string;
};

export async function getAllEvents(): Promise<EventData[]> {
  const query = groq`*[_type == "event"] | order(date asc) {
    _id,
    title,
    description,
    date,
    time,
    locationName,
    locationUrl,
    eventUrl,
    ticketsUrl,
    picture,
    "pictureUrl": picture.asset->url,
    "pictureDimensions": picture.asset->metadata.dimensions,
    "slug": slug.current
  }`;

  try {
    const events = await sanityClient.fetch<EventData[]>(query);
    return events || [];
  } catch (error) {
    console.error('Error fetching events from Sanity:', error);
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventData | null> {
  const query = groq`*[_type == "event" && slug.current == $slug][0] {
    _id,
    title,
    description,
    date,
    time,
    locationName,
    locationUrl,
    eventUrl,
    ticketsUrl,
    picture,
    "pictureUrl": picture.asset->url,
    "pictureDimensions": picture.asset->metadata.dimensions,
    "slug": slug.current
  }`;

  try {
    const event = await sanityClient.fetch<EventData | null>(query, { slug });
    return event || null;
  } catch (error) {
    console.error(`Error fetching event ${slug} from Sanity:`, error);
    return null;
  }
}

export async function getAllEventSlugs(): Promise<{ slug: string }[]> {
  const query = groq`*[_type == "event" && defined(slug.current)]{
    "slug": slug.current
  }`;

  try {
    const slugs = await sanityClient.fetch<{ slug: string }[]>(query);
    return slugs || [];
  } catch (error) {
    console.error('Error fetching event slugs from Sanity:', error);
    return [];
  }
}

