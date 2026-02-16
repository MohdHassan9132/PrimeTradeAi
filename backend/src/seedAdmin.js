import dotenv from 'dotenv'
import mongoose from "mongoose"
import {User} from "./models/user.model.js"
dotenv.config({
    path: "../.env"
})




const seedAdmin = async ()=>{

    try{
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`) 
        

        const admin = await User.create({
            email: "primetradeai@gmail.com",
            fullName: "primetradeai",
            password: "Primetradeai@123",
            avatar: "",
            avatarPublicId: "",
            role: "admin"
        })

        console.log(admin)

        process.exit(0)

    }catch(error){
        console.error("Error creating admin:", error)
        process.exit(1)
    }
}

seedAdmin()
