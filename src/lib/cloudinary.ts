/**
 * @file src/lib/cloudinary.ts
 * @fileoverview Utility functions for Cloudinary integration
 */

import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export interface CloudinaryImage {
  id: string;
  title: string;
  public_id: string;
  format: string;
  version: string;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
}

export interface Album {
  name: string;
  path: string;
  coverImage: string;
  imageCount: number;
}

/**
 * Get all albums from Cloudinary
 * @returns {Promise<Album[]>} Array of album objects
 */
export async function getAlbums(): Promise<Album[]> {
  try {
    // Get all root folders under 'Website Albums'
    const { folders } = await cloudinary.api.root_folders();
    const photosFolder = folders.find((f: any) => f.name === 'Website Albums');
    
    if (!photosFolder) {
      console.log('Website Albums folder not found, creating one...');
      await cloudinary.api.create_folder('Website Albums');
      return [];
    }
    
    // Get all subfolders under 'Website Albums'
    const { folders: albumFolders } = await cloudinary.api.sub_folders('Website Albums');
    
    if (!albumFolders || albumFolders.length === 0) {
      return [];
    }
    
    // Get the image count and cover image for each album
    const albumsWithMetadata = await Promise.all(
      albumFolders.map(async (folder: any) => {
        const path = folder.name.toLowerCase().replace(/\s+/g, '-');
        
        // Get the count and cover image in a single query
        const { resources, total_count } = await cloudinary.search
          .expression(`folder:"Website Albums/${folder.name}"`)
          .sort_by('created_at', 'desc')
          .max_results(1)
          .execute();
        
        // Get cover image from results
        let coverImage = '';
        if (resources && resources.length > 0) {
          coverImage = resources[0].secure_url;
        }

        // Default cover image if none found
        if (!coverImage) { coverImage = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/v1720386353/profile_qxup8e.jpg`; }

        return {
          name: folder.name,
          path,
          coverImage,
          imageCount: total_count
        };
      })
    );

    // Sort albums alphabetically by name
    return albumsWithMetadata.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    console.error('Error fetching albums from Cloudinary:', error);
    return [];
  }
}

/**
 * Get photos for a specific album from Cloudinary
 * @param {string} album - The album path or name
 * @returns {Promise<CloudinaryImage[]>} Array of image objects
 */
export async function getAlbumPhotos(album: string): Promise<CloudinaryImage[]> {
  try {
    // Get all albums first
    const albums = await getAlbums();
    
    // Match case-insensitively since URLs are lowercase
    const albumObj = albums.find(a => a.path.toLowerCase() === album.toLowerCase());
    
    if (!albumObj) {
      throw new Error(`Album not found: ${album}`);
    }
    
    // Get the actual folder name from the album name
    const folderPath = `Website Albums/${albumObj.name}`;
    
    // Get images from the folder using quoted folder path which seems to work best with spaces
    const { resources } = await cloudinary.search
      .expression(`folder:"${folderPath}"`)
      .sort_by('created_at', 'desc')
      .max_results(100)
      .execute();

    // Transform resources to CloudinaryImage format
    return resources.map((resource: any) => ({
      id: resource.asset_id,
      title: resource.filename || `Photo ${resource.asset_id}`,
      public_id: resource.public_id,
      format: resource.format,
      version: resource.version,
      resource_type: resource.resource_type,
      type: resource.type,
      created_at: resource.created_at,
      bytes: resource.bytes,
      width: resource.width,
      height: resource.height,
      url: resource.url,
      secure_url: resource.secure_url
    }));
  } catch (error) {
    console.error(`Error fetching photos for album ${album}:`, error);
    return [];
  }
}

/**
 * Get a single photo by ID from Cloudinary
 * @param {string} id - The photo ID or public_id
 * @returns {Promise<CloudinaryImage|null>} Image object or null if not found
 */
export async function getPhoto(id: string): Promise<CloudinaryImage | null> {
  try {
    let resources = [];
    
    // First try to find by asset_id
    const assetResult = await cloudinary.search
      .expression(`asset_id:${id}`)
      .max_results(1)
      .execute();
      
    if (assetResult.resources.length > 0) {
      resources = assetResult.resources;
    } else {
      // If not found by asset_id, try to find by public_id
      const publicIdResult = await cloudinary.search
        .expression(`public_id:${id}`)
        .max_results(1)
        .execute();
        
      if (publicIdResult.resources.length > 0) {
        resources = publicIdResult.resources;
      }
    }

    if (resources.length === 0) {
      return null;
    }

    const resource = resources[0];
    
    return {
      id: resource.asset_id,
      title: resource.filename || `Photo ${resource.asset_id}`,
      public_id: resource.public_id,
      format: resource.format,
      version: resource.version,
      resource_type: resource.resource_type,
      type: resource.type,
      created_at: resource.created_at,
      bytes: resource.bytes,
      width: resource.width,
      height: resource.height,
      url: resource.url,
      secure_url: resource.secure_url
    };
  } catch (error) {
    console.error(`Error fetching photo ${id}:`, error);
    return null;
  }
}