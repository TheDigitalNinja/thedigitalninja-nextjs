/**
 * @file src/app/(main)/blog/[slug]/page.tsx
 * @fileoverview Individual blog post page component for The Digital Ninja website
 * @description Renders individual blog posts, including metadata generation, static path generation, and content rendering with syntax highlighting.
 * 
 * @component PostPage
 * @returns {JSX.Element} The rendered blog post page
 */

import { use } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { FiClock, FiCalendar } from 'react-icons/fi';
import { marked } from 'marked';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-jsx';
import PageLayout from '@/components/PageLayout';
import FollowMeWidget from '@/components/FollowMeWidget';
import AboutAuthor from '@/components/AboutAuthor';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import { getSanityImageUrlFromId } from '@/lib/sanity';
import { OpenGraphType } from '@/types/openGraphType';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostData(resolvedParams.slug);
  const canonicalUrl = `https://TheDigital.Ninja/blog/${post.slug}`;
  const allowedOgTypes: OpenGraphType[] = ['article', 'website', 'book', 'profile', 'music.song', 'music.album', 'music.playlist', 'music.radio_station', 'video.movie', 'video.episode', 'video.tv_show', 'video.other'];
  const ogType: OpenGraphType = post.og?.type && allowedOgTypes.includes(post.og.type as OpenGraphType)
    ? (post.og.type as OpenGraphType)
    : 'article';
  const ogImage = post.og?.image || getSanityImageUrlFromId(post.sanityImageId, { width: 1200, height: 630 });
  const ogTitle = post.og?.title || post.title;
  const ogDescription = post.og?.description || post.excerpt;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: ogType,
      url: post.og?.url || canonicalUrl,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : undefined,
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): JSX.Element {
  const resolvedParams = use(params);
  const post = getPostData(resolvedParams.slug);
  const canonicalUrl = `https://TheDigital.Ninja/blog/${post.slug}`;
  const primaryImage = getSanityImageUrlFromId(post.sanityImageId, { width: 1200, height: 630 });

  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const language = lang || 'plaintext';
    const grammar = Prism.languages[language] || Prism.languages.plaintext;
    const highlightedCode = Prism.highlight(text, grammar, language);
    return `<pre><code class="language-${language}">${highlightedCode}</code></pre>`;
  };
  const contentHtml = marked(post.content, { renderer }) as string;

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
    "image": primaryImage || undefined,
    "url": canonicalUrl,
    "description": post.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
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
  };

  return (
    <PageLayout title="The Digital Ninja" useH1={false}>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <Script id="schema-org-data" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />

      <article className="prose dark:prose-invert w-full max-w-none lg:prose-xl mx-auto py-12">
        <h1 className='not-prose text-4xl font-bold mb-4'>{post.title}</h1>

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

        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />

        <AboutAuthor />
      </article>
      <FollowMeWidget />
    </PageLayout>
  );
}

