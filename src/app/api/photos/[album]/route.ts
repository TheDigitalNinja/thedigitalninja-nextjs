/**
 * @file src/app/api/photos/[album]/route.ts
 * @fileoverview API route for fetching photos in a specific album
 */

import { NextResponse } from 'next/server';
import { getAlbumPhotos } from '../../../../lib/cloudinary';

interface Context {
  params: {
    album: string;
  };
}

/**
 * GET handler to fetch photos for a specific album
 */
export async function GET(_request: Request, context: Context) {
  try {
    const { album } = context.params;
    const photos = await getAlbumPhotos(album);
    
    if (photos.length === 0) {
      return NextResponse.json(
        { error: 'Album not found or empty' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch photos' },
      { status: 500 }
    );
  }
}
