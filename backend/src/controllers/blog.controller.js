import { Blog } from "../models/blog.model.js";
import slugify from "slugify";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

// create Blog

const createBlog = asyncHandler(async (req, res) => {
  const { title, content, excerpt, featuredImage, category, tags, status } =
    req.body;

  if (!title?.trim() || !content?.trim() || !category?.trim()) {
    throw new ApiError(400, "Title, content and category are required");
  }

  const baseSlug = slugify(title, {
    lower: true,
    strict: true,
  });

  let slug = baseSlug;

  let count = 1;

  while (await Blog.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

    const plainText = content.replace(/<[^>]*>/g, "");

    const words = plainText.trim().split(/\s+/).length;

    const readTime = Math.ceil(words / 200);

    const blogTags = Array.isArray(tags) ? tags : [];

  const blog = await Blog.create({
    title,
    slug,
    content,
    excerpt,
    featuredImage,
    category,
    tags:blogTags,
    status,
    readTime,
    author: req.user._id,
  });

  return res.status(201).json({
    success: true,
    message: "Blog created successfully",
    data:blog,
  });
});



//get all blogs

const getAllBlogs = asyncHandler(async(req,res)=>{

    const {
        page = 1,
        limit=10,
        search,
        category,
        sort
    } = req.query


    const pageNumber = Math.max(1, Number(page) || 1);
    const limitNumber = Math.min(20, Math.max(1, Number(limit) || 10)); 

    const skip = ( pageNumber-1 ) * limitNumber;

    const query ={
        status:"published"
    }

    let searchTerm = search?.trim();

    if(searchTerm){
        const safeSearch = searchTerm.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

        query.title ={
            $regex : search,
            $option:"i"
        }
    }

    if(category){
        query.category = category
    }

    let sortOption = { createdAt: -1 };

    if (sort === "oldest") {
     sortOption = { createdAt: 1 };
    }

    const [blogs,totalBlogs] = await Promise.all([
        Blog.find(query)
        .populate("author","name avatar")
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)
        .lean(),

        Blog.countDocuments(query),
    ])


    return res.status(200).json({
        success:true,
        blogs,
        pagination:{
            currentPage:pageNumber,
            totalBlogs,
            totalPages:Math.ceil(totalBlogs/limitNumber),
            limit:limitNumber,
            hasNextPage :
                pageNumber < Math.ceil(totalBlogs/limitNumber),
            hasPrevPage:pageNumber > 1
        }
    })

})

const getSingleBlog = asyncHandler(async (req,res)=>{

    const {slug} = req.params;

    if(!slug?.trim()){
        throw new ApiError(400,"Slug is required")
    }

    const blog = await Blog.findOne({
        slug,
        status:"published"
    }).populate("author","name avatar")

    await Blog.findByIdAndUpdate(
        blog._id,
        {
            $inc:{
                views:1
            }
        }
    )

    const relatedBlogs = await Blog.find({
        category: blog.category,
        _id: { $ne: blog._id },
        status: "published",
    })
    .limit(4);


    if(!blog){
        throw new ApiError(404,"Blog not found")
    }

    return res.status(200).json({
        success:true,
        blog,
        relatedBlogs
    })

})

// get my blog by ID
const getMyBlogById = asyncHandler(async (req, res) => {

    const blog = await Blog.findOne({
        _id: req.params.id,
        author: req.user._id,
    });

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    return res.status(200).json({
        success: true,
        blog,
    });

});


//get my blogs
const getMyBlogs = asyncHandler(async(req,res)=>{
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const skip = (page-1)*10;
    const query  ={
        author:req.user._id
    }

    const [blogs, totalBlogs] = await Promise.all([
        Blog.find(query)
        .sort({updatedAt:-1})
        .skip(skip)
        .limit(limit),
        Blog.countDocuments()
    ])

    return res.status(200).json({
        success:true,
        blogs,
        pagination:{
            currentPage:page,
            totalBlogs,
            totalPages:Math.ceil(totalBlogs/limit)
        }
    })




})


const updateBlog = asyncHandler(async (req, res) => {

    const blog = await Blog.findById(req.params.id);

    if (!blog) {
        throw new ApiError(404, "Blog not found");
    }

    if (blog.author.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    const {
        title,
        content,
        excerpt,
        featuredImage,
        category,
        tags,
        status
    } = req.body;

    let slug = blog.slug;

    if (title && title !== blog.title) {

        const baseSlug = slugify(title, {
            lower: true,
            strict: true,
        });

        slug = baseSlug;

        let count = 1;

        while (
            await Blog.findOne({
                slug,
                _id: { $ne: blog._id },
            })
        ) {
            slug = `${baseSlug}-${count}`;
            count++;
        }
    }

    let readTime = blog.readTime;

    if (content) {

        const plainText = content.replace(/<[^>]*>/g, "");

        const words = plainText.trim().split(/\s+/).length;

        readTime = Math.max(1, Math.ceil(words / 200));

    }

    const updatedBlog = await Blog.findByIdAndUpdate(

        blog._id,

        {
            title,
            slug,
            content,
            excerpt,
            featuredImage,
            category,
            tags,
            status,
            readTime,
        },

        {
            new: true,
            runValidators: true,
        }

    );

    return res.status(200).json({

        success: true,

        message: "Blog updated successfully",

        blog: updatedBlog,

    });

});


//delete Blog

const deleteBlog = asyncHandler(async(req,res)=>{

    const blog = await Blog.findById(req.params.id);

    if(!blog){

        throw new ApiError(404,"Blog not found");

    }

    if(blog.author.toString() !== req.user._id.toString()){

        throw new ApiError(403,"Unauthorized");

    }

    // Cloudinary Delete
    // await deleteOnCloudinary(blog.featuredImage.public_id);

    await blog.deleteOne();

    return res.status(200).json({

        success:true,

        message:"Blog deleted successfully"

    });

});


export {
    createBlog,
    getAllBlogs,
    getSingleBlog,
    getMyBlogs,
    getMyBlogById,
    updateBlog,
    deleteBlog
}