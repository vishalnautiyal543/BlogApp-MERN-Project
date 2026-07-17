import React, { useState } from 'react';
import Editor from '../../components/Dashboard/Editor';
import {createApi} from '../../features/blog/blogApi';

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState("draft");
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handlePublish = async (e) => {
    e.preventDefault();
  
  if (!title || !blogContent) {
    alert("Please fill in the title and content.");
    return;
  }

  const tagsArray = tags.split(',').map(tag => tag.trim());
  setIsSubmitting(true);

  const blogData = {
    title,
    content: blogContent,
    category,
    tags: tagsArray,
    status,
  };

    
    try {
      const response = await createApi(blogData);
      console.log("Blog created successfully:", response);
      setTitle("");
      setBlogContent("");
      setCategory("");
      setTags([]);
      setStatus("draft");
      setIsSubmitting(true);
    } catch (error) {
      console.error("Error creating blog:", error);
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <div className="px-4 py-16 dark:bg-darkmode font-Inter bg-neutral-50 min-h-screen flex flex-col items-center justify-start">
      <h1 className='text-2xl font-semibold text-primary mb-4'>Create a New Blog</h1>

      <div className='w-full max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-white p-4 mb-4'>
        <input 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder="Enter blog title..." 
          name="title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>

      {/* Editor */}
      <Editor setBlogContent={setBlogContent} />
     
      {/* Category Input */}
      <div className='w-full my-3 max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-white p-4 mb-4'>
        <input 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder="Enter blog category [React,JavaScript,NodeJS]" 
          name="category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
      </div>

      {/* Tags Input */}
      <div className='w-full my-3 max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-sm bg-white p-4 mb-4'>
        <input 
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          type="text" 
          placeholder="Enter blog tags [#React,#JavaScript,#NodeJS]" 
          name="tags" 
          value={tags} 
          onChange={(e) => setTags(e.target.value)} 
        />
      </div>

      {/* Status Select */}
      <div className='w-full bg-white p-3 rounded-xl my-3 max-w-4xl mx-auto flex justify-start items-center gap-4'>
      <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)} className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
        <option value="draft">Draft</option>
        <option value="published">Published</option>
      </select>
      </div>


      {/* Publish Button */}
      <div className='w-full my-3 max-w-4xl mx-auto flex justify-start items-center gap-4'>
        <button 
          className={`px-4 py-2 text-white rounded-md transition-colors duration-300 cursor-pointer ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark'
          }`} 
          onClick={handlePublish}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;