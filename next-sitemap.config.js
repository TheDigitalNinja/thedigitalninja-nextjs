/** @type {import('next-sitemap').IConfig} */
const { createClient } = require('@sanity/client');

const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const sanityDataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const eventsListingPath = '/events';

async function getEventSlugPaths() {
  if (!sanityProjectId) {
    console.warn(
      '[next-sitemap] NEXT_PUBLIC_SANITY_PROJECT_ID is not set; skipping dynamic event slugs.'
    );
    return [];
  }

  const sanityClient = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: '2023-01-01',
    useCdn: true,
  });

  const query = `*[_type == "event" && defined(slug.current)]{
    "slug": slug.current
  }`;

  const slugs = await sanityClient.fetch(query);

  const validSlugs = (Array.isArray(slugs) ? slugs : [])
    .map((item) => item && item.slug)
    .filter((slug) => typeof slug === 'string' && slug.trim().length > 0)
    .map((slug) => slug.trim());

  return [...new Set(validSlugs)].map((slug) => `${eventsListingPath}/${slug}`);
}

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://TheDigital.Ninja',
  generateRobotsTxt: false,
  additionalPaths: async (config) => {
    const routes = [eventsListingPath];

    try {
      const eventSlugPaths = await getEventSlugPaths();
      routes.push(...eventSlugPaths);
    } catch (error) {
      console.warn('[next-sitemap] Failed to fetch event slugs from Sanity:', error);
    }

    const uniqueRoutes = [...new Set(routes)];
    return Promise.all(uniqueRoutes.map((route) => config.transform(config, route)));
  },
};