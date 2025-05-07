import Image from 'next/image';
import Link from 'next/link';

const AboutAuthor = () => {
  const authorName = "Russell Perkins";
  const authorTitle = "Solutions Architect";
  const authorImage = "https://cdn.sanity.io/images/nx08bxy1/production/d0fec3e55f52e54353851f8129a986c384ee5baa-2048x3071.jpg?w=100&h=100&fit=crop&auto=format&q=85"; 
  const authorBio = "I'm Russell Perkins, a Solutions Architect with a passion for all things tech. Feel free to dive into my blog posts for insights on software architecture, AI, and the latest in tech innovations.";
  const aboutPageUrl = "/about";

  return (
    <div className="not-prose w-full mt-12 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left">
        <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
          <Image
            src={authorImage}
            alt={authorName}
            width={100}
            height={100}
            className="rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="flex-grow">
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
