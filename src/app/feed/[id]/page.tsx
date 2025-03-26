import { getMicropostData, getAllMicropostIds } from '@/lib/microposts';
import { marked } from 'marked';
import { Metadata } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import Image from 'next/image';
import { FiCalendar } from 'react-icons/fi';
import Link from 'next/link';

interface MicropostPageProps {
  params: {
    id: string
  }
}

// Generate metadata for the micropost page
export async function generateMetadata({ params }: MicropostPageProps): Promise<Metadata> {
  const micropost = getMicropostData(params.id);
  // Get first line as title or use a default
  const title = micropost.content.split('\n')[0].replace(/#/g, '').trim() || 'Micropost';
  
  return {
    title: `${title} | The Digital Ninja`,
    description: micropost.content.substring(0, 160),
    openGraph: {
      title: title,
      description: micropost.content.substring(0, 160),
      type: 'article',
      url: `https://TheDigital.Ninja/feed/${micropost.id}`,
      images: micropost.imageUrl ? [
        {
          url: micropost.imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ] : undefined,
    },
  }
}

// Generate static paths for the micropost page
export async function generateStaticParams() {
  const microposts = getAllMicropostIds();
  return microposts.map((micropost) => ({
    id: micropost.id,
  }))
}

// Render the micropost page
export default function MicropostPage({ params }: MicropostPageProps) {
  const micropost = getMicropostData(params.id);
  const contentHtml = marked.parse(micropost.content);
  
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
    "url": `https://TheDigital.Ninja/feed/${micropost.id}`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://TheDigital.Ninja/feed/${micropost.id}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Digital Ninja",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk"
      }
    },
    "articleBody": micropost.content
  }

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://TheDigital.Ninja/feed/${micropost.id}`} />
      </Head>
  
      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
  
      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title="The Digital Ninja" useH1={true}/>
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="mb-6">                
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <FiCalendar className="mr-1" />
                  <time dateTime={micropost.date}>{formattedDate}</time>
                </div>
              </div>
              
              <div 
                className="prose dark:prose-invert lg:prose-xl max-w-none"
                dangerouslySetInnerHTML={{ __html: contentHtml }} 
              />
              
              {micropost.imageUrl && (
                <div className="mt-6">
                  <Image 
                    src={micropost.imageUrl}
                    alt="Post image"
                    width={800}
                    height={500}
                    className="rounded-md w-full h-auto"
                  />
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
  )
}