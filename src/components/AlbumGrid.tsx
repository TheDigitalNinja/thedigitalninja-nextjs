/**
 * @file src/components/AlbumGrid.tsx
 * @fileoverview Component to display a grid of photo albums
 */

"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Album, urlFor } from '@/lib/sanity-photo-albums';

interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.length === 0 ? (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No albums found. Create some albums in your Sanity studio.</p>
        </div>
      ) : (
        albums.map((album) => (
          <Link href={`/photos/${album.slug.current}`} key={album._id} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-square group">
                {album.coverImage ? (
                  <Image
                    src={urlFor(album.coverImage).width(500).height(500).format('webp').quality(80).url()}
                    alt={album.title}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <span className="text-gray-500 dark:text-gray-400">No cover image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{album.title}</h3>
                {album.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{album.description}</p>
                )}
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AlbumGrid;