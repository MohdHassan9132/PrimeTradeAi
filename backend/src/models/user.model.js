import mongoose,{Schema} from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    fullName:{
        type: String,
        required: true
    },
    avatar:{
        type: String,
    },
    avatarPublicId:{
        type: String
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        enum: ["admin","FE"],
        default: "FE"

    },
    isActive:{
        type: Boolean,
        default: true
    },
    refreshToken:{
        type: String,
        default: ""
    },
    tokenVersion:{
        type: Number,
        default: 0
    }
},{timestamps: true})

userSchema.pre("save", async function(){
    if(!this.isModified("password"))return;
     this.password = await bcrypt.hash(this.password,8)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
            tokenVersion: this.tokenVersion
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}



export const User = mongoose.model("User",userSchema);