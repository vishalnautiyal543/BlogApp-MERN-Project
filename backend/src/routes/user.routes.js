import {Router} from "express"
import {upload} from "../middlewares/multer.middleware.js"
import {login, refreshAccessToken, register} from "../controllers/user.controller.js"

const router = Router()

router.post("/signup",upload.single("avatar"),register)
router.post("/login",login)
router.post("/refresh-token",refreshAccessToken)

export default router;