import { getMicropostBySlug, getAllMicropostSlugs } from '@/lib/sanity-microposts'; 
import { Metadata } from 'next';
import Script from 'next/script';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from 'next/image';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';
import { notFound } from "next/navigation";
import { use } from 'react';

// Mark page as dynamic for data fetching - always render the page on the server
export const dynamic = 'force-dynamic';

// Generate metadata for the micropost page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }>; 
}): Promise<Metadata> {
  const resolvedParams = await params; 
  const micropost = await getMicropostBySlug(resolvedParams.id); 
  
  if (!micropost) {
    return {
      title: 'Post Not Found | The Digital Ninja',
    };
  }
  
  // Get first line as title or use a default
  const title = micropost.content.split('\n')[0].replace(/#/g, '').trim() || 'Micropost';
  
  return {
    title: `${title} | The Digital Ninja`,
    description: micropost.content.substring(0, 160),
    openGraph: {
      title: title,
      description: micropost.content.substring(0, 160),
      type: 'article',
      url: `https://TheDigital.Ninja/feed/${micropost.slug}`,
      images: micropost.images && micropost.images.length > 0 ? [
        {
          url: micropost.images[0],
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
    },
  };
}

// Generate static paths for the micropost page
export async function generateStaticParams(): Promise<{ id: string }[]> {
  const ids = await getAllMicropostSlugs(); // Correct function name
  return ids.map((item) => ({
    id: item.id,
  }));
}

// Render the micropost page
export default function MicropostPage({ 
  params 
}: { 
  params: Promise<{ id: string }>;
}): JSX.Element {
  const resolvedParams = use(params); 
  const micropost = use(getMicropostBySlug(resolvedParams.id)); 
  
  if (!micropost) {
    notFound();
  }
  
  // Format date
  const formattedDate = new Date(micropost.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SocialMediaPosting",
    "datePublished": micropost.date,
    "dateModified": micropost.date,
    "author": {
      "@type": "Person",
      "name": "Russell Perkins",
      "url": "https://TheDigital.Ninja/about",
    },
    "url": `https://TheDigital.Ninja/feed/${micropost.slug}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://TheDigital.Ninja/feed/${micropost.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Digital Ninja",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk"
      }
    },
    "articleBody": micropost.content,
    ...(micropost.location?.name && {
      "contentLocation": {
        "@type": "Place",
        "name": micropost.location.name
      }
    })
  };

  return (
    <>
      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
  
      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title="The Digital Ninja" useH1={true}/>
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="mb-6 flex flex-wrap items-center gap-4">                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiCalendar className="mr-1" />
                  <time dateTime={micropost.date}>{formattedDate}</time>
                </div>
                
                {micropost.location?.name && (
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <FiMapPin className="mr-1" />
                    <span>{micropost.location.name}</span>
                  </div>
                )}
              </div>
              
              <div className="text-lg whitespace-pre-wrap">
                {micropost.content}
              </div>
              
              {/* Display multiple images if available */}
              {micropost.images && micropost.images.length > 0 && (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {micropost.images.map((imageUrl, index) => (
                    <div key={index} className={micropost.images.length === 1 ? 'col-span-2' : ''}>
                      <Image 
                        src={imageUrl}
                        alt={`Post image ${index + 1}`}
                        width={1200}
                        height={750}
                        quality={90}
                        loading={index === 0 ? "eager" : "lazy"}
                        priority={index === 0}
                        className="rounded-md w-full h-auto object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {micropost.tags && micropost.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {micropost.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link href="/feed" className="text-blue-600 dark:text-blue-400 hover:underline inline-block">
                  ← Back to Feed
                </Link>
              </div>
            </article>
          </main>
        </div>
      </div>
    </>
  );
}