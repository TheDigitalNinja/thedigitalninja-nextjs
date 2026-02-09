import { use } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageLayout from '@/components/PageLayout';
import { getEventBySlug } from '@/lib/sanity-events';
import { urlFor } from '@/lib/sanity-photo-albums';

// Events are expected to change over time; always render on the server at request-time.
export const dynamic = 'force-dynamic';

function formatEventDate(dateIso: string) {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateIso);
  const d = new Date(isDateOnly ? `${dateIso}T00:00:00` : dateIso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function isPastEvent(dateIso: string) {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateIso);
  const d = new Date(isDateOnly ? `${dateIso}T00:00:00` : dateIso);
  d.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return d < today;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await getEventBySlug(resolvedParams.slug);

  if (!event) {
    return { title: 'Event Not Found - The Digital Ninja' };
  }

  const description = event.description.replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    title: `${event.title} - The Digital Ninja`,
    description,
    openGraph: {
      title: `${event.title} - The Digital Ninja`,
      description,
      type: 'article',
      url: `https://TheDigital.Ninja/events/${event.slug}`,
      images: event.picture
        ? [
            {
              url: urlFor(event.picture).width(1200).height(630).fit('crop').url(),
              width: 1200,
              height: 630,
              alt: event.title,
            },
          ]
        : undefined,
    },
  };
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): JSX.Element {
  const resolvedParams = use(params);
  const event = use(getEventBySlug(resolvedParams.slug));

  if (!event) {
    notFound();
  }

  const formattedDate = formatEventDate(event.date);
  const pastEvent = isPastEvent(event.date);

  return (
    <PageLayout title="Events" useH1={false}>
      <article className="w-full max-w-none mx-auto py-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{event.title}</h1>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 text-sm gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-gray-600 dark:text-gray-400">
            <span>
              <time dateTime={event.date}>{formattedDate}</time>
              {event.time ? <span> • {event.time}</span> : null}
            </span>
            <span>
              {event.locationUrl ? (
                <a
                  href={event.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {event.locationName}
                </a>
              ) : (
                <span>{event.locationName}</span>
              )}
            </span>
          </div>

          {(event.ticketsUrl || event.eventUrl) && (
            <div className="flex flex-wrap gap-3">
              {!pastEvent && event.ticketsUrl && (
                <a
                  href={event.ticketsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
                >
                  Get Tickets
                </a>
              )}
              {event.eventUrl && (
                <a
                  href={event.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md border border-blue-600 px-4 py-2 text-blue-700 dark:text-blue-300 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  Event Info
                </a>
              )}
            </div>
          )}
        </div>

        {event.picture && (
          <div className="mb-10">
            <Image
              src={urlFor(event.picture).width(2000).fit('max').url()}
              alt={event.title}
              width={event.pictureDimensions?.width ?? 1200}
              height={event.pictureDimensions?.height ?? 800}
              sizes="100vw"
              priority
              className="w-full h-auto object-contain"
            />
          </div>
        )}

        <div className="prose dark:prose-invert w-full max-w-none lg:prose-xl">
          <p className="whitespace-pre-wrap">{event.description}</p>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link href="/events" className="text-blue-600 dark:text-blue-400 hover:underline inline-block">
            ← Back to Events
          </Link>
        </div>
      </article>
    </PageLayout>
  );
}

