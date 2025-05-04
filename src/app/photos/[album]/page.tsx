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
import { use } from 'react'; 

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ album: string }>; 
}): Promise<Metadata> {
  const resolvedParams = await params; 
  const albums = await getAlbums();
  const album = albums.find(a => a.slug.current === resolvedParams.album);
  
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
      url: `https://TheDigital.Ninja/photos/${resolvedParams.album}`,
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

export async function generateStaticParams(): Promise<{ album: string }[]> {
  const albums = await getAlbums();
  return albums.map((album) => ({
    album: album.slug.current,
  }));
}

export default function AlbumPage({ 
  params 
}: { 
  params: Promise<{ album: string }>; 
}): JSX.Element {
  const resolvedParams = use(params); 
  const albums = use(getAlbums()); // Use React.use() for async data fetching
  const album = albums.find(a => a.slug.current === resolvedParams.album);
  
  if (!album) {
    notFound();
  }

  const photos = use(getAlbumPhotos(resolvedParams.album)); // Use React.use() for async data fetching
  
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