import { User } from "../models/user.model.js";
import { ApiError } from "../utils/api_error.js";
import { asyncHandler } from "../utils/async_handler.js";
import jwt from 'jsonwebtoken'
import { ENV } from "../config/env.js";


const verifyJWT = asyncHandler(async(req,res,next)=>{
    const token = req?.cookies?.accessToken
    if(!token){
        throw new ApiError(498,"Access Token missing")
    }
    const tokenData = jwt.verify(token, ENV.TOKENS.ACCESS_SECRET);
    
    const user = await User.findById(tokenData._id).select("-password -avatarPublicId -refreshToken")

    if(!user){
        throw new ApiError(404,"User not longer exists")
    }

    if(!user.isActive){
        throw new ApiError(403,"User is deactivated")
    }

    if(tokenData.tokenVersion !== user.tokenVersion){
        throw new ApiError(401,"Session expired")
    }
    req.user = user
    next()
})

export {verifyJWT}