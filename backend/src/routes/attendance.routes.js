import { Router } from "express";
import{verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import {checkIn,checkOut,getMyMonthlyAttendance,getMyTodayStatus} from '../controller/attendance.controller.js'
const attendanceRouter = Router()
attendanceRouter.route("/checkIn").post(verifyJWT,upload.single("image"),checkIn)
attendanceRouter.route("/checkOut").patch(verifyJWT,upload.single("image"),checkOut)
attendanceRouter.route("/getMyTodayStatus").get(verifyJWT,getMyTodayStatus)
attendanceRouter.route("/getMyMonthlyStatus").get(verifyJWT,getMyMonthlyAttendance)

export{attendanceRouter}