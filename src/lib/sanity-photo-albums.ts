import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { sanityClient, sanityImageBuilder } from './sanity-client';

export function urlFor(source: SanityImageSource) {
  return sanityImageBuilder.image(source);
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface AlbumPhoto {
  title?: string;
  image: SanityImage;
  description?: string;
  takenAt?: string;
}

export interface Album {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  coverImage?: SanityImage;
  description?: string;
  photos?: AlbumPhoto[];
}

export interface Photo {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
  image: SanityImage;
  album: {
    _ref: string;
    _type: 'reference';
  };
  description?: string;
  takenAt?: string;
}

/**
 * Get all albums from Sanity
 * @returns {Promise<Album[]>} Array of album objects
 */
export async function getAlbums(): Promise<Album[]> {
  try {
    const query = `*[_type == "album"] | order(title asc) {
      _id,
      title,
      slug,
      coverImage,
      description,
      "photoCount": count(photos)
    }`;
    
    const albums = await sanityClient.fetch<(Album & { photoCount?: number })[]>(query);
    
    // For albums that don't have a coverImage yet but have photos,
    // use the first photo as the cover image
    for (const album of albums) {
      if (!album.coverImage && album.photoCount && album.photoCount > 0) {
        const firstPhotoQuery = `*[_type == "album" && _id == $id][0].photos[0].image`;
        const firstPhoto = await sanityClient.fetch<SanityImage>(firstPhotoQuery, { id: album._id });
        if (firstPhoto) {
          album.coverImage = firstPhoto;
        }
      }
    }
    
    return albums;
  } catch (error) {
    console.error('Error fetching albums from Sanity:', error);
    return [];
  }
}

/**
 * Get photos for a specific album from Sanity
 * @param {string} slug - The album slug
 * @returns {Promise<Photo[]>} Array of photo objects
 */
export async function getAlbumPhotos(slug: string): Promise<Photo[]> {
  try {
    // First try to get photos from the album's photos array (new schema)
    const albumQuery = `*[_type == "album" && slug.current == $slug][0] {
      photos[]{
        title,
        image,
        description,
        takenAt
      }
    }`;
    
    const album = await sanityClient.fetch<{ photos?: AlbumPhoto[] }>(albumQuery, { slug });
    
    if (album && album.photos && album.photos.length > 0) {
      // Map the AlbumPhoto objects to Photo objects
      return album.photos.map((photo, index) => ({
        _id: `album-photo-${index}`,
        title: photo.title || '',
        image: photo.image,
        description: photo.description,
        takenAt: photo.takenAt,
        album: { _ref: '', _type: 'reference' }
      }));
    }
    
    // Fallback to the old schema if no photos found in the album
    const query = `*[_type == "photo" && album->slug.current == $slug] | order(takenAt desc) {
      _id,
      title,
      slug,
      image,
      description,
      takenAt
    }`;
    
    const photos = await sanityClient.fetch<Photo[]>(query, { slug });
    return photos;
  } catch (error) {
    console.error(`Error fetching photos for album ${slug}:`, error);
    return [];
  }
}

/**
 * Get a single photo by ID from Sanity
 * @param {string} id - The photo ID
 * @returns {Promise<Photo|null>} Photo object or null if not found
 */
export async function getPhoto(id: string): Promise<Photo | null> {
  try {
    const query = `*[_type == "photo" && _id == $id][0] {
      _id,
      title,
      slug,
      image,
      description,
      takenAt,
      album->
    }`;
    
    const photo = await sanityClient.fetch<Photo | null>(query, { id });
    return photo;
  } catch (error) {
    console.error(`Error fetching photo ${id}:`, error);
    return null;
  }
}

