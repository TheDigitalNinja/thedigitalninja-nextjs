import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/PageLayout';
import { getAllEvents, type EventData } from '@/lib/sanity-events';
import { urlFor } from '@/lib/sanity-photo-albums';

// Events change over time; always render on the server at request-time.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Events - The Digital Ninja',
  description: 'Upcoming and past events for The Digital Ninja.',
  openGraph: {
    title: 'Events - The Digital Ninja',
    description: 'Upcoming and past events for The Digital Ninja.',
    type: 'website',
    url: 'https://TheDigital.Ninja/events',
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

function formatEventDate(dateIso: string) {
  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateIso);
  const d = new Date(isDateOnly ? `${dateIso}T00:00:00` : dateIso);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function getEventExcerpt(description: string, maxLen = 160) {
  const normalized = description.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLen) return normalized;
  return normalized.slice(0, maxLen - 1).trimEnd() + '…';
}

function splitAndSortEvents(events: EventData[]) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const toLocalDate = (dateIso: string) => {
    const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(dateIso);
    return new Date(isDateOnly ? `${dateIso}T00:00:00` : dateIso);
  };

  const upcoming: EventData[] = [];
  const past: EventData[] = [];

  for (const e of events) {
    const d = toLocalDate(e.date);
    d.setHours(0, 0, 0, 0);
    if (d >= today) upcoming.push(e);
    else past.push(e);
  }

  upcoming.sort((a, b) => toLocalDate(a.date).getTime() - toLocalDate(b.date).getTime());
  past.sort((a, b) => toLocalDate(b.date).getTime() - toLocalDate(a.date).getTime());

  return { upcoming, past };
}

export default async function EventsPage() {
  const events = await getAllEvents();
  const { upcoming, past } = splitAndSortEvents(events);

  return (
    <PageLayout title="Events" useH1={true}>

      {events.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            No events yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Upcoming</h2>
              <div className="space-y-6">
                {upcoming.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="group block"
                  >
                    <article className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                      {event.picture && (
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                          <Image
                            src={urlFor(event.picture).width(800).height(600).fit('crop').url()}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className={event.picture ? 'md:w-2/3 p-5 md:p-6' : 'p-5 md:p-6'}>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {event.title}
                        </h3>

                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div>
                            <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                            {event.time ? <span> • {event.time}</span> : null}
                          </div>
                          <div className="mt-1">{event.locationName}</div>
                        </div>

                        <p className="text-gray-800 dark:text-gray-200">
                          {getEventExcerpt(event.description)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Past</h2>
              <div className="space-y-6">
                {past.map((event) => (
                  <Link
                    key={event._id}
                    href={`/events/${event.slug}`}
                    className="group block"
                  >
                    <article className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
                      {event.picture && (
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                          <Image
                            src={urlFor(event.picture).width(800).height(600).fit('crop').url()}
                            alt={event.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      )}

                      <div className={event.picture ? 'md:w-2/3 p-5 md:p-6' : 'p-5 md:p-6'}>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                          {event.title}
                        </h3>

                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div>
                            <time dateTime={event.date}>{formatEventDate(event.date)}</time>
                            {event.time ? <span> • {event.time}</span> : null}
                          </div>
                          <div className="mt-1">{event.locationName}</div>
                        </div>

                        <p className="text-gray-800 dark:text-gray-200">
                          {getEventExcerpt(event.description)}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </PageLayout>
  );
}

