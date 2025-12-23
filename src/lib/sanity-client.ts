import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

// Centralized image builder so all Sanity helpers share the same instance
export const sanityImageBuilder = imageUrlBuilder(sanityClient);

export function urlForImage(source: SanityImageSource) {
  return sanityImageBuilder.image(source);
}

type SanityImageFit =
  | 'clip'
  | 'crop'
  | 'fill'
  | 'fillmax'
  | 'max'
  | 'scale'
  | 'min';

type SanityImageTransformOptions = {
  width?: number;
  height?: number;
  fit?: SanityImageFit;
};

export function getSanityImageUrlFromId(
  imageId?: string,
  { width, height, fit = 'crop' }: SanityImageTransformOptions = {}
): string {
  if (!imageId) return '';

  let imageBuilder = sanityImageBuilder.image(imageId);

  if (width) {
    imageBuilder = imageBuilder.width(width);
  }

  if (height) {
    imageBuilder = imageBuilder.height(height);
  }

  if (fit) {
    imageBuilder = imageBuilder.fit(fit);
  }

  return imageBuilder.url();
}

