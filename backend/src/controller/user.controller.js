import {asyncHandler} from '../utils/async_handler.js'
import { ApiResponse } from '../utils/api_response.js'
import {ApiError} from '../utils/api_error.js'
import { uploadMedia,deleteMedia } from '../utils/cloudinary.js'
import {User} from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { cookieOptions } from "../config/cookie.js";
import { ENV } from "../config/env.js";


const refreshAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return{accessToken: accessToken,
            refreshToken: refreshToken
        }
    } catch (error) {
        throw new ApiError(500,"Error while generating tokens")
    }
}

const loginUser = asyncHandler(async(req,res)=>{
    //get username or email and password 
    //check for the fields
    //get the user
    //compare password
    //generate the tokens
    //set the tokens as cookie
    //save the refresh in the doc
    //return the response

    const password = req.body.password
    const email = req.body.email 
    if(!email){
        throw new ApiError(400,"Email is required")
    }
    let trimmedEmail;
   if(email !== null){
        if(typeof email === "string"){
            trimmedEmail = email.trim().toLowerCase()
        }else{
            throw new ApiError(400,"email must be string")
        }
        if(!trimmedEmail){
            throw new ApiError(400,"Email cannot be empty")
        }
   }
    let trimmedPassword;
    if(!password){
        throw new ApiError(400,"password is required")
    }
    if(typeof password === "string"){
        trimmedPassword = password.trim()
        if(!trimmedPassword){
            throw new ApiError(400,"Password cannot be empty")
        }
    }else{
        throw new ApiError(400,"Password must be string")
    }

    const userData = await User.findOne({email: trimmedEmail})

    if(!userData){
        throw new ApiError(404,"No User found")
    }
    if(!userData.isActive){
        throw new ApiError(403,"User is deactivated")
    }

    const isCorrect = await userData.isPasswordCorrect(trimmedPassword)

    if(!isCorrect){
        throw new ApiError(401,"Invalid Credentials")
    }

    userData.tokenVersion += 1
    await userData.save({ validateBeforeSave: false })

    const {refreshToken,accessToken} = await refreshAccessAndRefreshToken(userData._id)

    const user = userData.toObject()
    delete user.avatarPublicId
    delete user.password
    delete user.refreshToken

    res.status(200)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .cookie("accessToken",accessToken,cookieOptions)
    .json(new ApiResponse(200,user,"User logged in successfully"))
})

const logoutUser = asyncHandler(async(req,res)=>{
    //get the user
    //clear the cookie
    //clear the refreshToken in db
    //return the response
    const user = req.user
    user.refreshToken = ""
    await user.save({validateBeforeSave: false})
    res.status(200)
    .clearCookie("refreshToken",cookieOptions)
    .clearCookie("accessToken",cookieOptions)
    .json(new ApiResponse(200,null,"User logged out successfully"))

})

const getUser = asyncHandler(async(req,res)=>{
    //verify the user get the user object and pass it into the response
    const userData = req.user
    const user = userData.toObject()
    delete user.avatarPublicId
    delete user.refreshToken
    delete user.password
    res.status(200)
    .json(new ApiResponse(200,user,"User fetched successfully"))
})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    //check for refreshToken
    //generate both token and return the response
    const token = req.cookies.refreshToken
    if(!token){
        throw new ApiError(401,"Unauthorized Access")
    }
    const tokenData = jwt.verify(token, ENV.TOKENS.REFRESH_SECRET);
    const user = await User.findById(tokenData._id)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    if(user.refreshToken !== token){
        throw new ApiError(401,"token mismatch")
    }
    const {refreshToken,accessToken} = await refreshAccessAndRefreshToken(tokenData._id)
    res.status(200)
    .cookie("refreshToken",refreshToken,cookieOptions)
    .cookie("accessToken",accessToken,cookieOptions)
    .json(new ApiResponse(200,{refreshToken,accessToken},"Access token refresh successfully"))
    
})

const UpdateUserAvatar = asyncHandler(async(req,res)=>{
    const userData = req.user
    const avatar = req?.file
    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }
    let newAvatar;
    try {
        newAvatar = await uploadMedia(avatar,"image")
        const oldAvatar = userData?.avatarPublicId
        userData.avatarPublicId = newAvatar.public_id
        userData.avatar = newAvatar.secure_url
        await userData.save()
        if(oldAvatar){
            await deleteMedia(oldAvatar,"image")
        }
        res.status(200)
        .json(new ApiResponse(200,newAvatar.secure_url,"Avatar updated successfully"))
    } catch (error) {
        if(newAvatar?.public_id){
            await deleteMedia(newAvatar.public_id,"image")
        }
        throw error
    }
})


export{loginUser,logoutUser,getUser,refreshAccessToken,UpdateUserAvatar}