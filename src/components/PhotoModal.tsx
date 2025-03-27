/**
 * @file src/components/PhotoModal.tsx
 * @fileoverview Modal component for displaying full-screen photos
 */

"use client";

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { XMarkIcon, ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { urlFor } from '../lib/sanity';

interface SanityPhotoExtended {
  _id: string;
  title?: string;
  image: any;
  imageUrl: string;
}

interface PhotoModalProps {
  photo: SanityPhotoExtended;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  albumName?: string;
  nextPhotos?: string[];
}

const PhotoModal: React.FC<PhotoModalProps> = ({ 
  photo, 
  isOpen, 
  onClose, 
  onNavigate, 
  albumName,
  nextPhotos = []
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    
    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        onNavigate('prev');
        break;
      case 'ArrowRight':
        onNavigate('next');
        break;
      default:
        break;
    }
  }, [isOpen, onClose, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    // Lock body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  // Use optimized size for the modal view while preserving aspect ratio
  const largeImageUrl = urlFor(photo.image)
    .width(1920)
    .quality(90)
    .auto('format')
    .url();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-hidden">
      {/* Remove Head component to fix infinite re-rendering */}
      
      <div className="relative w-full h-full flex flex-col">
        {/* Header */}
        <div className="p-4 flex justify-between items-center text-white fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent">
          <div className="text-lg font-medium">
            {albumName && <span className="mr-2">{albumName} /</span>}
            <span>{photo.title || 'Untitled'}</span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-black/50 p-2 hover:bg-black/70"
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Main image - centered with constraints */}
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden" style={{ top: '64px', bottom: '24px' }}>
          <div className="relative max-h-full max-w-full">
            <Image
              src={largeImageUrl}
              alt={photo.title || 'Photo'}
              width={1920}
              height={1080}
              className="max-h-[80vh] max-w-full object-contain"
              priority
              unoptimized
            />
          </div>
        </div>
        
        {/* Hidden preloader divs for next and previous images */}
        <div className="hidden">
          {nextPhotos.map((url, index) => (
            <img 
              key={`preload-${index}`} 
              src={url} 
              alt="Preloaded" 
            />
          ))}
        </div>
        
        {/* Navigation controls - fixed position to avoid overlap issues */}
        <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-20">
          <button
            onClick={() => onNavigate('prev')}
            className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            aria-label="Previous photo"
          >
            <ArrowLeftIcon className="h-8 w-8" />
          </button>
        </div>
        
        <div className="fixed top-1/2 right-4 transform -translate-y-1/2 z-20">
          <button
            onClick={() => onNavigate('next')}
            className="bg-black/50 hover:bg-black/70 p-2 rounded-full text-white"
            aria-label="Next photo"
          >
            <ArrowRightIcon className="h-8 w-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoModal;