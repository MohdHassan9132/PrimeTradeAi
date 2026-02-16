import {asyncHandler} from '../utils/async_handler.js'
import {ApiError} from '../utils/api_error.js'
import {ApiResponse} from '../utils/api_response.js'
import {User} from '../models/user.model.js'
import {uploadMedia,deleteMedia} from '../utils/cloudinary.js'

const registerFieldAgent = asyncHandler(async(req,res)=>{
    if(req.user.role != "admin"){
        throw new ApiError(403,"Forbidden request")
    }
     const {email,fullName,password} = req.body
    if([email,fullName,password].some(fields => !fields || !fields.trim())){
        throw new ApiError(400,"All fields are required")
    }
    const isUser = await User.findOne({email});

    if(isUser){
        throw new ApiError(409,"User already exists")
    }
    
    const avatar = req?.file

    let avatarImage;
 try {
        if(avatar){
            avatarImage = await uploadMedia(avatar,'image')
        }
        const user = await User.create({
            email: email,fullName,password,avatar: avatarImage?.secure_url,avatarPublicId: avatarImage?.public_id,
            role: "FE"
        })
        
        const userData = user.toObject()
        delete userData.avatarPublicId
        delete userData.password
        res.status(201)
        .json(new ApiResponse(201,userData,"User registered successfully"))
    } catch (error) {
        if(avatarImage?.public_id){
            await deleteMedia(avatarImage.public_id,"image")
        }
        throw error
    }
})

const getAllFieldAgentsProfile = asyncHandler(async(req,res)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403,"Forbidden request")
    }
    const agents = await User.find({
        role: "FE"
    }).select("-refreshToken -avatarPublicId -password -role")
    res.status(200)
    .json(new ApiResponse(200,agents,"FieldAgent profile fetched successfully"))
})

const toggleFieldAgent = asyncHandler(async(req,res)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403,"Forbidden request")
    }

    const {userId} = req.params

    if(!userId){
        throw new ApiError(400,"UserId is required")
    }

    const agent = await User.findById(userId)

    if(!agent || agent.role !== "FE"){
        throw new ApiError(404,"FieldAgent not found")
    }

    agent.isActive = !agent.isActive
await agent.save()

    res.status(200)
    .json(new ApiResponse(200,{userId: agent._id,isActive: agent.isActive},
    agent.isActive 
        ? "FieldAgent activated successfully"
        : "FieldAgent deactivated successfully"
    ))

})


const changeFieldAgentPassword = asyncHandler(async(req,res)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403,"Forbidden request")
    }

    const {userId} = req.params
    const {newPassword} = req.body

    if(!newPassword){
        throw new ApiError(400,"New Password is required")
    }

    const agent = await User.findById(userId)

    if(!agent || agent.role !== "FE"){
        throw new ApiError(404,"FieldAgent not found")
    }

    agent.password = newPassword.trim()
    await agent.save()

    res.status(200)
    .json(new ApiResponse(200,null,"Password updated successfully"))
})

const getFieldAgentProfileById = asyncHandler(async(req,res)=>{

    if(req.user.role !== "admin"){
        throw new ApiError(403,"Forbidden request")
    }

    const { userId } = req.params

    const agent = await User.findById(userId)
        .select("-password -refreshToken -avatarPublicId")

    if(!agent || agent.role !== "FE"){
        throw new ApiError(404,"FieldAgent not found")
    }

    res.status(200)
    .json(new ApiResponse(200,agent,"FieldAgent profile fetched successfully"))
})




export{getAllFieldAgentsProfile,changeFieldAgentPassword,registerFieldAgent,toggleFieldAgent,getFieldAgentProfileById}