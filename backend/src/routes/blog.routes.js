import {Router} from "express"
import { addComment, createBlog, deleteBlog, deleteComment, getAllBlogs, getMyBlogById, getMyBlogs, getSingleBlog, getTrendingBlogs, toggleLike, updateBlog } from "../controllers/blog.controller.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/create",auth,createBlog)
router.get("/",getAllBlogs)
router.get("/me",auth,getMyBlogs)
router.get("/me/:id",auth,getMyBlogById)
router.get("/:slug",getSingleBlog)
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);

router.post("/:id/like", auth, toggleLike);
router.post("/:id/comment", auth, addComment);
router.delete(
    "/comment/:commentId",
    auth,
    deleteComment
);


router.get("/trending",getTrendingBlogs)


export default router