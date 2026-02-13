const SANITY_API_VERSION = '2023-01-01';

type ResolveOptions = {
  nextPublicValue?: string;
  studioValue?: string;
  nextPublicKey: string;
  studioKey: string;
  label: 'projectId' | 'dataset';
};

function resolveSharedSanityEnv({
  nextPublicValue,
  studioValue,
  nextPublicKey,
  studioKey,
  label,
}: ResolveOptions): string {

  if (nextPublicValue && studioValue && nextPublicValue !== studioValue) {
    throw new Error(
      `Sanity ${label} mismatch: ${nextPublicKey} and ${studioKey} must match.`
    );
  }

  const resolvedValue = nextPublicValue || studioValue;
  if (!resolvedValue) {
    throw new Error(
      `Missing Sanity ${label}. Set ${nextPublicKey} (and optionally ${studioKey} to the same value).`
    );
  }

  return resolvedValue;
}

export const sanityProjectId = resolveSharedSanityEnv({
  nextPublicValue: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  studioValue: process.env.SANITY_STUDIO_PROJECT_ID,
  nextPublicKey: 'NEXT_PUBLIC_SANITY_PROJECT_ID',
  studioKey: 'SANITY_STUDIO_PROJECT_ID',
  label: 'projectId',
});

export const sanityDataset = resolveSharedSanityEnv({
  nextPublicValue: process.env.NEXT_PUBLIC_SANITY_DATASET,
  studioValue: process.env.SANITY_STUDIO_DATASET,
  nextPublicKey: 'NEXT_PUBLIC_SANITY_DATASET',
  studioKey: 'SANITY_STUDIO_DATASET',
  label: 'dataset',
});

export const sharedSanityConfig = {
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: SANITY_API_VERSION,
} as const;
