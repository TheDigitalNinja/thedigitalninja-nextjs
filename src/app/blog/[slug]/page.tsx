/**
 * @file src/app/blog/[slug]/page.tsx
 * @fileoverview Individual blog post page component for The Digital Ninja website
 * @description This file contains the logic for rendering individual blog posts,
 *              including metadata generation, static path generation, and content rendering
 *              with syntax highlighting. It also includes Schema.org structured data.
 * 
 * @component PostPage
 * @returns {JSX.Element} The rendered blog post page
 */

import { getPostData, getSortedPostsData } from '../../../lib/posts'
import { OpenGraphType } from '../../../types/openGraphType';
import { marked } from 'marked'
import { Metadata } from 'next'
import Head from 'next/head';
import Script from 'next/script';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import FollowMeWidget from "../../../components/FollowMeWidget";
import { FiClock, FiCalendar } from 'react-icons/fi'

// Syntax Highlighting by prismjs
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // Syntax Highlighting theme
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jsx';

interface PostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for the post page
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = getPostData(params.slug)
  const ogType: OpenGraphType = ['article', 'website', 'book', 'profile', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'video.movie', 'video.episode', 'video.tv_show', 'video.other'].includes(post.og.type as OpenGraphType) ? (post.og.type as OpenGraphType) : 'article';

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.og.title,
      description: post.og.description,
      type: ogType,
      url: `https://TheDigital.Ninja/blog/${post.slug}`,
      images: [
        {
          url: post.og.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  }
}

// Generate static paths for the post page
export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Render the post page
export default function PostPage({ params }: PostPageProps) {
  const post = getPostData(params.slug)

  // Use Prism.js to highlight code blocks
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang, escaped }) => {
    const language = lang || 'plaintext';
    const highlightedCode = Prism.highlight(text, Prism.languages[language], language);
    return `<pre><code class="language-${language}">${highlightedCode}</code></pre>`;
  };
  const contentHtml = marked(post.content, { renderer }) as string

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date,
    "author": {
      "@type": "Person",
      "name": "Russell Perkins",
      "jobTitle": "Principal Technical Consultant",
      "image": "https://res.cloudinary.com/thedigitalninja/image/upload/v1720386353/profile_qxup8e.jpg",
      "url": "https://TheDigital.Ninja/about",
      "sameAs": [
        "https://linkedin.com/in/russellperkins/",
        "https://github.com/TheDigitalNinja",
        "https://twitter.com/TheDigitalNinja",
        "https://instagram.com/perkinsrussell/",
        "https://facebook.com/RussellPerkinsDenver",
        "https://youtube.com/TheDigitalNinja"
      ]
    },
    "image": `https://res.cloudinary.com/TheDigitalNinja/image/upload/${post.cloudinaryImageId}`,
    "url": `https://TheDigital.Ninja/blog/${post.slug}`,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://TheDigital.Ninja/blog/${post.slug}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Digital Ninja",
      "logo": {
        "@type": "ImageObject",
        "url": "https://res.cloudinary.com/TheDigitalNinja/image/upload/logo-white-bg_uk6pkk"
      }
    },
    "articleBody": post.content
  }

  return (
    <>
      <Head>
        <link rel="canonical" href={`https://TheDigital.Ninja/blog/${post.slug}`} />
      </Head>
  
      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
  
      <div className="min-h-screen md:flex">
        <Sidebar />
        <div className="flex flex-col w-full md:pl-64">
          <Header title="The Digital Ninja" useH1={false}/>
          <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <article>
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 text-sm">
                <div className="flex items-center mb-4 sm:mb-0">
                  <span className="flex items-center mr-4 text-gray-500 dark:text-gray-400">
                    <FiCalendar className="mr-1" />
                    {post.date}
                  </span>
                  <span className="flex items-center text-gray-500 dark:text-gray-400">
                    <FiClock className="mr-1" />
                    {post.readTime} min read
                  </span>
                </div>
                <div className="flex flex-wrap">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div 
                className="prose dark:prose-invert lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: contentHtml }} 
              />
            </article>
          </main>
          <FollowMeWidget />
        </div>
      </div>
    </>
  )
}
