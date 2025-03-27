/**
 * @file src/components/AlbumGrid.tsx
 * @fileoverview Component to display a grid of photo albums
 */

"use client";

import Link from 'next/link';
import Image from 'next/image';

interface Album {
  name: string;
  path: string;
  coverImage: string;
  imageCount: number;
}

interface AlbumGridProps {
  albums: Album[];
}

const AlbumGrid: React.FC<AlbumGridProps> = ({ albums }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.length === 0 ? (
        <div className="col-span-full py-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">No albums found. Create some folders in your Cloudinary account.</p>
        </div>
      ) : (
        albums.map((album) => (
          <Link href={`/photos/${album.path}`} key={album.path} className="block">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-square group">
                <Image
                  src={album.coverImage}
                  alt={album.name}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
                {/* Overlay with photo count on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <span className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded-md text-sm">
                    {album.imageCount} {album.imageCount === 1 ? 'photo' : 'photos'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{album.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {album.imageCount === 0 ? 'Empty album' : 
                   album.imageCount === 1 ? '1 photo' : 
                   `${album.imageCount} photos`}
                </p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default AlbumGrid;