/**
 * @file src/app/api/photos/route.ts
 * @fileoverview API route for fetching photos data
 */

import { NextResponse } from 'next/server';
import { getAlbums } from '../../../lib/cloudinary';

/**
 * GET handler to fetch all photo albums
 */
export async function GET() {
  try {
    const albums = await getAlbums();
    return NextResponse.json({ albums });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    );
  }
}
