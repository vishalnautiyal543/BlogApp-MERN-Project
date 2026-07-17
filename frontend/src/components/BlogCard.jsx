import React from 'react';
import { Link } from 'react-router-dom';

// Simple date formatter helper function
const formatDate = (dateString) => {
  if (!dateString) return "1d ago"; // Default fallback
  const date = new Date(dateString);
  // Example formatting: "July 15, 2026"
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const BlogCard = (props) => {
  const { title, author, featuredImage, upvotes, comments, readTime, createdAt } = props.Card;

  return (
    <article className="font-Inter dark:bg-darkmode flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 dark:hover:bg-darkmode dark:hover:border-primary/20 dark:hover:shadow-lg dark:shadow-primary/10 transition-colors duration-200 
      w-full 
      sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 
      mx-auto lg:mx-0 border border-gray-100/50 dark:border-gray-700/50"> 
      
      {/* Featured Image - Left side */}
      <div className="shrink-0 w-24 h-16 sm:w-32 sm:h-20 overflow-hidden rounded-md bg-gray-100">
        {featuredImage ? (
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content Container - Right side */}
      <div className="flex flex-col flex-1 min-w-0">
        
        {/* Metadata Row: Author, Formatted Date, Read Time */}
        <div className="flex items-center gap-1.5 text-xs dark:text-gray-400 text-gray-500 mb-1 flex-wrap">
          <span className="font-medium text-gray-700 dark:text-yellow-100/50 tracking-wide truncate max-w-30">
            {author?.name || "Anonymous"}
          </span>
          <span>•</span>
          {/* Apply date formatter to the raw ISO string from image_2.png */}
          <span>{formatDate(createdAt)}</span>
          <span><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-icon lucide-clock"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg></span>
          <span>{readTime || "10 min"}</span>
        </div>

        {/* Title */}
        <h2 className="text-sm sm:text-base dark:text-gray-100 font-bold text-gray-900 line-clamp-2 leading-tight hover:text-blue-600 mb-2">
          <Link to={`/blog/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
            {title}
          </Link>
        </h2>

        {/* Interaction Bar (Upvotes & Comments) */}
        <div className="flex items-center gap-2 mt-auto">
          {/* Upvote Pill */}
          <button className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
            <span>{upvotes || 0}</span>
          </button>

          {/* Comment Pill */}
          <button className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785 4.5 4.5 0 003.206-1.352c.616-.062 1.252-.104 1.858-.104z" />
            </svg>
            <span>{comments || 0}</span>
          </button>
        </div>

      </div>
    </article>
  );
};

export default BlogCard;