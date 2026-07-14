import {Router} from "express"
import { createBlog, deleteBlog, getAllBlogs, getMyBlogById, getMyBlogs, getSingleBlog, updateBlog } from "../controllers/blog.controller.js"
import { auth } from "../middlewares/auth.middleware.js"

const router = Router()

router.post("/create",auth,createBlog)
router.get("/",getAllBlogs)
router.get("/me",auth,getMyBlogs)
router.get("/me/:id",auth,getMyBlogById)
router.get("/:slug",getSingleBlog)
router.put("/:id", auth, updateBlog);
router.delete("/:id", auth, deleteBlog);


export default router