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
import { OpenGraphType } from '../../../lib/openGraphType';
import { marked } from 'marked'
import { Metadata } from 'next'
import Head from 'next/head';
import Script from 'next/script';
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

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
      url: post.og.url,
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
  const contentHtml = marked(post.content, { renderer })

  // Schema.org structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.date, // Assuming the publish date is also the last modified date
    "author": {
      "@type": "Person",
      "name": "Russell Perkins",
      "url": "https://TheDigital.Ninja"
    },
    "image": post.og.image,
    "url": `https://TheDigital.Ninja/blog/${post.slug}`,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://TheDigital.Ninja/blog/${post.slug}`
    }
  };

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
              <p className="text-gray-600 dark:text-gray-400 mb-8">{post.date}</p>
              <div 
                className="prose dark:prose-invert lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: contentHtml }} 
              />
            </article>
          </main>
        </div>
      </div>
    </>
  )
}
