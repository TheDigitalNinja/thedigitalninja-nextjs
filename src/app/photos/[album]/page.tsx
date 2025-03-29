/**
 * @file src/app/photos/[album]/page.tsx
 * @fileoverview Page for displaying photos in a specific album
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import PhotoGrid from "../../../components/PhotoGrid";
import { getAlbumPhotos, getAlbums } from "../../../lib/sanity";

interface AlbumPageProps {
  params: {
    album: string;
  };
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
  const albumSlug = params.album;
  const albums = await getAlbums();
  const album = albums.find(a => a.slug.current === albumSlug);
  
  if (!album) {
    return {
      title: 'Album Not Found - The Digital Ninja',
    };
  }

  return {
    title: `${album.title} Photos - The Digital Ninja`,
    description: album.description || `Browse ${album.title} photos by Russell Perkins.`,
    openGraph: {
      title: `${album.title} Photos - The Digital Ninja`,
      description: album.description || `Browse ${album.title} photos by Russell Perkins.`,
      type: 'website',
      url: `https://TheDigital.Ninja/photos/${albumSlug}`,
      images: [
        {
          url: 'https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk.jpg',
          width: 1200,
          height: 1200,
          alt: 'The Digital Ninja Logo',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const albums = await getAlbums();
  return albums.map((album) => ({
    album: album.slug.current,
  }));
}

export default async function AlbumPage({ params }: AlbumPageProps) {
  const { album: albumSlug } = params;
  
  // Fetch albums to get the current album name
  const albums = await getAlbums();
  const album = albums.find(a => a.slug.current === albumSlug);
  
  if (!album) {
    notFound();
  }

  // Fetch photos
  const photos = await getAlbumPhotos(albumSlug);
  
  if (photos.length === 0) {
    // Show empty album state instead of 404
    return (
      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title={album.title} />
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">  
            {album.description && (
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">{album.description}</p>
              </div>
            )}        
            <PhotoGrid photos={[]} albumName={album.title} />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <div className="flex flex-col w-full md:pl-64">
        <Header title={album.title} />
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">  
          {album.description && (
            <div className="mb-6">
              <p className="text-gray-700 dark:text-gray-300">{album.description}</p>
            </div>
          )}        
          <PhotoGrid photos={photos} albumName={album.title} />
        </main>
      </div>
    </div>
  );
}