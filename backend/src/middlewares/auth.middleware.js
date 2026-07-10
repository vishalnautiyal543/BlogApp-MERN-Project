import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"

const auth = async (req,res,next) =>{
    try {

        const authHeader = req.header("Authorization");

        const token = authHeader?.split(" ")[1];
        
        if (!token) {
            throw new ApiError(401,"Unauthorized Request")
        }

        const decode = jwt.verify(token,process.env.JWT_ACCESS_TOKEN)

        const user = await User.findById(decode._id).select("-password -refreshToken")
        
        if(!user){
            throw new ApiError(401,"Invalid access token")
        }

        req.user = user

        next()
        
    } catch (error) {

        throw new ApiError(401, error?.message || "Invalid access token")
        
    }
}

export {auth}