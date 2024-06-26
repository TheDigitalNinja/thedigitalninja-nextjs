import { getPostData, getSortedPostsData } from '../../../lib/posts'
import { marked } from 'marked'
import { Metadata } from 'next'

interface PostPageProps {
  params: {
    slug: string
  }
}

type OpenGraphType = 'article' | 'website' | 'book' | 'profile' | 'music.song' | 'music.album' | 'music.playlist' | 'music.radio_station' | 'video.movie' | 'video.episode' | 'video.tv_show' | 'video.other';


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
  const contentHtml = marked(post.content)

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-8">{post.date}</p>
      <div 
        className="prose lg:prose-xl"
        dangerouslySetInnerHTML={{ __html: contentHtml }} 
      />
    </article>
  )
}
