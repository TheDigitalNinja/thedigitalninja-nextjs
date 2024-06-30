import { getPostData, getSortedPostsData } from '../../../lib/posts'
import { marked } from 'marked'
import { Metadata } from 'next'
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

  // Use Prism.js to highlight code blocks
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang, escaped }) => {
    const language = lang || 'plaintext';
    const highlightedCode = Prism.highlight(text, Prism.languages[language], language);
    return `<pre><code class="language-${language}">${highlightedCode}</code></pre>`;
  };
  const contentHtml = marked(post.content, { renderer })

  return (
    <div className="min-h-screen flex flex-col">
      <Header title="The Digital Ninja" useH1={false}/>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article>
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-600 mb-8">{post.date}</p>
            <div 
              className="prose dark:prose-invert lg:prose-xl"
              dangerouslySetInnerHTML={{ __html: contentHtml }} 
            />
          </article>
        </main>
      </div>
    </div>
  )
}
