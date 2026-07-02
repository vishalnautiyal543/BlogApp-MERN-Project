import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {login, register} from "../controllers/user.controller.js"

const router = Router()

router.post("/signup",upload.single("avatar"),register)
router.post("/login",login)

export default router;