import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getSingleBlog } from '../features/blog/blogThunk';

const BlogContent = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  
  // Redux state se data extract kar rahe hain
  const { singleBlog, loading, error } = useSelector((state) => state.blog);

  useEffect(() => {
    if (slug) {
      dispatch(getSingleBlog(slug));
    }
  }, [slug, dispatch]);

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-darkmode">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-indigo-600"></div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Loading blog...</p>
        </div>
      </div>
    );
  }

  // Error State (Agar API fail ho jaye)
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
        <div className="text-center">
          <p className="text-sm font-semibold text-red-600 dark:text-red-400">Error</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {error || "Something went wrong"}
          </h1>
          <div className="mt-6">
            <Link to="/blogs" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-indigo-500 transition-colors">
              Go back to blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Agar blog data na mile
  if (!singleBlog || !singleBlog.blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">No blog found</h1>
          <Link to="/blogs" className="mt-4 inline-block text-sm text-indigo-600 hover:underline">
            Back to articles
          </Link>
        </div>
      </div>
    );
  }

  // Data destructuring (safety ke sath)
  const { title, content, author, createdAt, coverImage, tags } = singleBlog.blog;

  // Date formatting helper
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="min-h-screen bg-zinc-50 py-12 px-4 dark:bg-darkmode sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="mx-auto max-w-3xl">
        
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            to="/blogs" 
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
          >
            ← Back to blogs
          </Link>
        </div>

        {/* Blog Header Meta */}
        <header className="mb-8">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-indigo-700/10 dark:bg-indigo-950/50 dark:text-indigo-400 dark:ring-indigo-400/20"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-950 dark:text-zinc-50 sm:text-4xl lg:text-5xl leading-tight">
            {title}
          </h1>

          {/* Author info & Date */}
          <div className="mt-6 flex items-center gap-x-4 border-b border-zinc-200 dark:border-zinc-800 pb-6">
            {author?.avatar ? (
              <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full bg-zinc-100 object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                {author?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
            )}
            <div className="text-sm">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {author?.name || 'Anonymous'}
              </p>
              <p className="text-zinc-500 dark:text-zinc-400">
                <time dateTime={createdAt}>{formattedDate}</time>
              </p>
            </div>
          </div>
        </header>

        {/* Featured Image (Optional) */}
        {coverImage && (
          <div className="mb-10 overflow-hidden rounded-2xl bg-zinc-100 shadow-sm aspect-video">
            <img 
              src={coverImage} 
              alt={title} 
              className="h-full w-full object-cover object-center"
            />
          </div>
        )}

        {/* Blog Main Content */}
        {/* Note: Agar aapka content HTML format me backend se aa raha h, to 'dangerouslySetInnerHTML' use karein */}
        <div 
          className="prose font-Inter tracking-wide prose-zinc mx-auto dark:prose-invert max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-zinc-50
            prose-p:leading-8 prose-p:text-zinc-800 dark:prose-p:text-zinc-300
            prose-a:text-indigo-600 dark:prose-a:text-indigo-400 hover:prose-a:underline
            prose-strong:text-zinc-950 dark:prose-strong:text-zinc-50
            prose-code:rounded-md prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm dark:bg-darkmode dark:text-gray-100"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        
        {/* Agar normal text content h bina HTML tags ke, to aap upar wala dangerouslySetInnerHTML hata kar simply ye use kar sakte hain: */}
        {/* <div className="text-zinc-800 dark:text-zinc-300 leading-8 whitespace-pre-wrap">{content}</div> */}

      </div>
    </article>
  );
};

export default BlogContent;