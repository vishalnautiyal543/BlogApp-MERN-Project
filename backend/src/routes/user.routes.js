import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {register} from "../controllers/user.controller.js"

const router = Router()

router.post("/signup",upload.single("avatar"),register)

export default router;