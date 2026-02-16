import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {UpdateUserAvatar,getUser,loginUser,logoutUser,refreshAccessToken} from '../controller/user.controller.js'

const userRouter = Router()
userRouter.route("/login").post(loginUser)
userRouter.route("/logout").post(verifyJWT,logoutUser)
userRouter.route("/getUser").get(verifyJWT,getUser)
userRouter.route("/refreshAccessToken").post(refreshAccessToken)
userRouter.route("/updateUserAvatar").patch(verifyJWT,upload.single("image"),UpdateUserAvatar)

export{userRouter}