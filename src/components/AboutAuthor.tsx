import Image from 'next/image';
import Link from 'next/link';

const AboutAuthor = () => {
  const authorName = "Russell Perkins";
  const authorTitle = "Engineeer, Father, Foodie, Traveler";
  const authorImage = "https://cdn.sanity.io/images/nx08bxy1/production/d0fec3e55f52e54353851f8129a986c384ee5baa-2048x3071.jpg?w=500&q=85&auto=format"; 
  const authorBio = "I'm Russell Perkins, a Solutions Architect with a passion for all things tech. Feel free to dive into my blog posts for insights on software architecture, AI, and the latest in tech innovations.";
  const aboutPageUrl = "/about";

  return (
    <div className="not-prose w-full mt-12 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
      <div className="flex flex-col items-center sm:items-start sm:flex-row">
        {/* Image container - circular on mobile, wider rectangle on desktop */}
        <div className="w-[120px] h-[120px] mt-6 sm:mt-0 sm:w-[140px] sm:h-auto flex-shrink-0 sm:min-h-full">
          <div className="w-full h-full rounded-full sm:rounded-none overflow-hidden">
            <Image
              src={authorImage}
              alt={authorName}
              width={800}
              height={1200}
              className="object-cover w-full h-full rounded-full sm:rounded-none"
              priority
              quality={90}
            />
          </div>
        </div>
        
        {/* Content container */}
        <div className="flex-grow p-6 text-center sm:text-left">
          <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-white">{authorName}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{authorTitle}</p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm leading-relaxed">
            {authorBio}
          </p>
          <Link href={aboutPageUrl} className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">
            Read more about Russell
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutAuthor;
