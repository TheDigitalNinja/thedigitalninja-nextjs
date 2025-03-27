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
      {albums.map((album) => (
        <Link href={`/photos/${album.path}`} key={album.path} className="block">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="relative aspect-square">
              <Image
                src={album.coverImage}
                alt={album.name}
                width={500}
                height={500}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{album.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{album.imageCount} photos</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AlbumGrid;