/**
 * @file src/components/PhotoGrid.tsx
 * @fileoverview Component to display a grid of photos
 */

"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import PhotoModal from './PhotoModal';
import { Photo, urlFor } from '../lib/sanity';

interface SanityPhotoExtended extends Photo {
  imageUrl: string;
  fullSizeUrl: string;
}

interface PhotoGridProps {
  photos: Photo[];
  albumName?: string;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, albumName }) => {
  // Process photos to add imageUrl and fullSizeUrl - using useMemo to prevent recreating on each render
  const processedPhotos = useMemo(() => {
    return photos.map(photo => ({
      ...photo,
      imageUrl: urlFor(photo.image).width(400).height(400).quality(80).format('webp').url(),
      fullSizeUrl: urlFor(photo.image).width(1920).quality(90).auto('format').url()
    }));
  }, [photos]);

  const [selectedPhoto, setSelectedPhoto] = useState<SanityPhotoExtended | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Get next photos function without state
  const getAdjacentPhotos = (photo: SanityPhotoExtended) => {
    const currentIndex = processedPhotos.findIndex(p => p._id === photo._id);
    const nextUrls: string[] = [];
    
    // Get URLs for the next and previous photos
    [-2, -1, 1, 2].forEach(offset => {
      const index = (currentIndex + offset + processedPhotos.length) % processedPhotos.length;
      if (processedPhotos[index]) {
        nextUrls.push(processedPhotos[index].fullSizeUrl);
      }
    });
    
    return nextUrls;
  };

  const openModal = (photo: SanityPhotoExtended) => {
    setSelectedPhoto(photo);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    // Delay clearing the selected photo to avoid flickering during the closing animation
    setTimeout(() => setSelectedPhoto(null), 300);
  };

  const navigatePhotos = (direction: 'prev' | 'next') => {
    if (!selectedPhoto) return;
    
    const currentIndex = processedPhotos.findIndex(p => p._id === selectedPhoto._id);
    let newIndex: number;
    
    if (direction === 'prev') {
      newIndex = currentIndex <= 0 ? processedPhotos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex >= processedPhotos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedPhoto(processedPhotos[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full px-4 sm:px-0">
        {processedPhotos.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">No photos found in this album. Add some photos in your Sanity studio.</p>
          </div>
        ) : (
          processedPhotos.map((photo: SanityPhotoExtended) => (
            <div 
              key={photo._id} 
              className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800 rounded-lg cursor-pointer transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 w-full"
              onClick={() => openModal(photo)}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title || 'Photo'}
                width={400}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          ))
        )}
      </div>

      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          isOpen={modalOpen}
          onClose={closeModal}
          onNavigate={navigatePhotos}
          albumName={albumName}
          nextPhotos={selectedPhoto ? getAdjacentPhotos(selectedPhoto) : []}
        />
      )}
    </>
  );
};

export default PhotoGrid;