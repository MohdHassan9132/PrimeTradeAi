import { Router } from "express";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js'
import {changeFieldAgentPassword,toggleFieldAgent,getAllFieldAgentsProfile,registerFieldAgent, getFieldAgentProfileById} from '../controller/admin.controller.js'
import {getMonthlyReport,getMonthlyReportById,getTodayStatus, getTodayStatusById,getDailyAttendanceById} from '../controller/attendance.controller.js'

const adminRouter = Router()
adminRouter.route("/getAllFieldAgentsProfile").get(verifyJWT,getAllFieldAgentsProfile)
adminRouter.route("/changeFieldAgentPassword/:userId").post(verifyJWT,changeFieldAgentPassword)
adminRouter.route("/registerFieldAgent").post(verifyJWT,upload.single("image"),registerFieldAgent)
adminRouter.route("/toggleFieldAgent/:userId").post(verifyJWT,toggleFieldAgent)
adminRouter.route("/getMontlyReport").get(verifyJWT,getMonthlyReport)
adminRouter.route("/getMonthlyReportById/:userId").get(verifyJWT,getMonthlyReportById)
adminRouter.route("/getTodayStatus").get(verifyJWT,getTodayStatus)
adminRouter.route("/getFieldAgentProfileById/:userId").get(verifyJWT,getFieldAgentProfileById)
adminRouter.route("/getTodayStatusById/:userId").get(verifyJWT,getTodayStatusById)
adminRouter.route("/getDailyAttendanceById/:userId").get(verifyJWT, getDailyAttendanceById);


export{adminRouter}