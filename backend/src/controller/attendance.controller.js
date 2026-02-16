import { asyncHandler } from '../utils/async_handler.js'
import { Attendance } from '../models/attendance.model.js'
import { ApiError } from '../utils/api_error.js'
import { ApiResponse } from '../utils/api_response.js'
import { User } from '../models/user.model.js'
import { getCurrentDateTime, getStartAndEndOfDay, getStartAndEndOfMonth } from '../utils/dateFormatter.js'
import { deleteMedia, uploadMedia } from '../utils/cloudinary.js'
import { DateTime } from 'luxon'

const checkIn = asyncHandler(async (req, res) => {
    if (req.user.role !== "FE") {
        throw new ApiError(403, "Forbidden request")
    }

    if (!req.user.isActive) {
        throw new ApiError(403, "Account is deactivated")
    }

    const image = req?.file
    const { latitude, longitude } = req.body

    if (!image) {
        throw new ApiError(400, "Live check-in image is required")
    }

    if (!latitude || !longitude) {
        throw new ApiError(400, "Location is required")
    }

    const now = getCurrentDateTime()
    const { startOfDay } = getStartAndEndOfDay()

    const openAttendance = await Attendance.findOne({
        fieldAgent: req.user._id,
        Out: { $exists: false }
    })

    if (openAttendance) {
        const autoCheckoutTime = DateTime
            .fromJSDate(openAttendance.In)
            .setZone("Asia/Kolkata")
            .endOf("day")
            .toUTC()
            .toJSDate()

        openAttendance.Out = autoCheckoutTime
        openAttendance.durationMinutes = Math.floor(
            (openAttendance.Out - openAttendance.In) / (1000 * 60)
        )

        await openAttendance.save()
    }

    const existing = await Attendance.findOne({
        fieldAgent: req.user._id,
        date: startOfDay
    })

    if (existing) {
        throw new ApiError(400, "Already Checked In Today")
    }

    let uploadedImage

    try {
        uploadedImage = await uploadMedia(image, "image")

        const attendanceDoc = await Attendance.create({
            fieldAgent: req.user._id,
            date: startOfDay,
            In: now,
            checkInImage: uploadedImage.secure_url,
            checkInImagePublicId: uploadedImage.public_id,
            checkInLocation: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            }
        })

        res.status(201).json(
            new ApiResponse(201, attendanceDoc, "CheckIn successful.")
        )

    } catch (error) {
        if (uploadedImage?.public_id) {
            await deleteMedia(uploadedImage.public_id, "image")
        }
        throw error
    }
})

const checkOut = asyncHandler(async (req, res) => {
    if (req.user.role !== "FE") {
        throw new ApiError(403, "Forbidden request")
    }

    const image = req?.file
    const { latitude, longitude } = req.body

    if (!image) {
        throw new ApiError(400, "Checkout image is required")
    }

    if (!latitude || !longitude) {
        throw new ApiError(400, "Location is required")
    }

    const now = getCurrentDateTime()
    const { startOfDay } = getStartAndEndOfDay()

    const attendanceDoc = await Attendance.findOne({
        fieldAgent: req.user._id,
        date: startOfDay
    })

    if (!attendanceDoc) {
        throw new ApiError(404, "You haven't checked in today")
    }

    if (attendanceDoc.Out) {
        throw new ApiError(400, "Already Checked Out")
    }

    let uploadedImage

    try {
        uploadedImage = await uploadMedia(image, "image")

        attendanceDoc.checkOutImage = uploadedImage.secure_url
        attendanceDoc.checkOutImagePublicId = uploadedImage.public_id

        attendanceDoc.checkOutLocation = {
            latitude: Number(latitude),
            longitude: Number(longitude)
        }

        attendanceDoc.Out = now
        attendanceDoc.durationMinutes = Math.floor(
            (attendanceDoc.Out - attendanceDoc.In) / (1000 * 60)
        )

        await attendanceDoc.save()

        res.status(200).json(
            new ApiResponse(200, attendanceDoc, "CheckOut successful.")
        )

    } catch (error) {
        if (uploadedImage?.public_id) {
            await deleteMedia(uploadedImage.public_id, "image")
        }
        throw error
    }
})

const getMonthlyReport = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Forbidden request")
    }

    const { year, month } = req.query

    if (!year || !month) {
        throw new ApiError(400, "Year and Month are required")
    }

    const { startDate, endDate, totalDaysInMonth } = getStartAndEndOfMonth(year, month)

    const report = await Attendance.aggregate([
        {
            $match: {
                date: {
                    $gte: startDate,
                    $lt: endDate
                }
            }
        },
        {
            $group: {
                _id: "$fieldAgent",
                presentDays: { $sum: 1 },
                totalMinutes: { $sum: "$durationMinutes" }
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "agent"
            }
        },
        {
            $unwind: "$agent"
        },
        {
            $project: {
                _id: 0,
                agentId: "$_id",
                fullName: "$agent.fullName",
                email: "$agent.email",
                presentDays: 1,
                absentDays: {
                    $subtract: [totalDaysInMonth, "$presentDays"]
                },
                totalMinutes: 1
            }
        }
    ])

    res.status(200)
        .json(new ApiResponse(200, report, "Monthly report fetched successfully"))
})

const getMonthlyReportById = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Forbidden request")
    }

    const { userId } = req.params
    const { year, month } = req.query

    if (!userId) {
        throw new ApiError(400, "UserId is required")
    }

    if (!year || !month) {
        throw new ApiError(400, "Year and Month are required")
    }

    const agent = await User.findById(userId)

    if (!agent || agent.role !== "FE") {
        throw new ApiError(404, "FieldAgent not found")
    }

    const { startDate, endDate, totalDaysInMonth } =
        getStartAndEndOfMonth(year, month)

    const records = await Attendance.find({
        fieldAgent: userId,
        date: { $gte: startDate, $lt: endDate }
    }).select("date durationMinutes")

    const presentDays = records.length
    const absentDays = totalDaysInMonth - presentDays

    const totalMinutes = records.reduce((sum, record) => {
        return sum + record.durationMinutes
    }, 0)

    
    const presentDates = records.map(record => {
        return DateTime.fromJSDate(record.date)
            .setZone("Asia/Kolkata")
            .day
    })

    const dailyAttendance = []

    for (let day = 1; day <= totalDaysInMonth; day++) {
        dailyAttendance.push({
            day,
            status: presentDates.includes(day) ? "PRESENT" : "ABSENT"
        })
    }

    res.status(200).json(
        new ApiResponse(200, {
            agentId: agent._id,
            fullName: agent.fullName,
            email: agent.email,
            avatar: agent.avatar,
            presentDays,
            absentDays,
            totalMinutes,
            dailyAttendance
        }, "Monthly report fetched successfully")
    )
})

const getTodayStatus = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Forbidden request")
    }
    const { startOfDay, endOfDay } = getStartAndEndOfDay()

    const todaysAttendance = await Attendance.find({ date: startOfDay }).populate("fieldAgent", "fullName email")

    const allAgents = await User.find({
        role: "FE",
        isActive: true
    }).select("fullName email")

    const active = []
    const completed = []
    const presentAgentIds = []

    todaysAttendance.forEach(record => {
        presentAgentIds.push(record.fieldAgent._id.toString())

        if (record.Out) {
            completed.push(record)
        } else {
            active.push(record)
        }
    })

    const absent = allAgents.filter(agent => {
        return !presentAgentIds.includes(agent._id.toString())
    })

    res.status(200)
        .json(new ApiResponse(200, {
            active,
            completed,
            absent
        }, "Today status fetched successfully"))
})

const getMyTodayStatus = asyncHandler(async (req, res) => {

    if (req.user.role !== "FE") {
        throw new ApiError(403, "Forbidden request")
    }

    const { startOfDay, endOfDay } = getStartAndEndOfDay()

    const attendance = await Attendance.findOne({
        fieldAgent: req.user._id, date: startOfDay
    })

    if (!attendance) {
        return res.status(200)
            .json(new ApiResponse(200, {
                status: "NOT_CHECKED_IN",
                checkIn: null,
                checkOut: null,
                durationMinutes: 0
            }, "Today status fetched successfully"))
    }

    const status = attendance.Out ? "COMPLETED" : "ACTIVE"

    res.status(200)
        .json(new ApiResponse(200, {
            status,
            checkIn: attendance.In,
            checkOut: attendance.Out || null,
            durationMinutes: attendance.durationMinutes,
            checkInImage: attendance.checkInImage,
            checkOutImage: attendance.checkOutImage || null
        }, "Today status fetched successfully"))
})

const getTodayStatusById = asyncHandler(async (req, res) => {

    if (req.user.role !== "admin") {
        throw new ApiError(403, "Forbidden request")
    }

    const { userId } = req.params

    if (!userId) {
        throw new ApiError(400, "UserId is required")
    }

    const agent = await User.findById(userId)
        .select("fullName email avatar role isActive")

    if (!agent || agent.role !== "FE") {
        throw new ApiError(404, "FieldAgent not found")
    }

    const { startOfDay, endOfDay } = getStartAndEndOfDay()

    const attendance = await Attendance.findOne({
        fieldAgent: userId, date: startOfDay

    })
    if (!attendance) {
        return res.status(200)
            .json(new ApiResponse(200, {
                agentId: agent._id,
                fullName: agent.fullName,
                email: agent.email,
                avatar: agent.avatar,
                status: "NOT_CHECKED_IN",
                checkIn: null,
                checkOut: null,
                durationMinutes: 0,
                checkInLocation: attendance?.checkInLocation || null,
                checkOutLocation: attendance?.checkOutLocation || null
            }, "Today status fetched successfully"))
    }

    const status = attendance.Out ? "COMPLETED" : "ACTIVE"

    res.status(200)
        .json(new ApiResponse(200, {
            agentId: agent._id,
            fullName: agent.fullName,
            email: agent.email,
            avatar: agent.avatar,
            status,
            checkIn: attendance.In,
            checkOut: attendance.Out || null,
            durationMinutes: attendance.durationMinutes,
            checkInImage: attendance.checkInImage,
            checkOutImage: attendance.checkOutImage || null,
            checkInLocation: attendance.checkInLocation || null,
            checkOutLocation: attendance.checkOutLocation || null
        }, "Today status fetched successfully"))
})

const getMyMonthlyAttendance = asyncHandler(async (req, res) => {

    if (req.user.role !== "FE") {
        throw new ApiError(403, "Forbidden request")
    }

    const { year, month } = req.query

    if (!year || !month) {
        throw new ApiError(400, "Year and Month are required")
    }

    const { startDate, endDate, totalDaysInMonth } =
        getStartAndEndOfMonth(year, month)

    const records = await Attendance.find({
        fieldAgent: req.user._id,
        date: {
            $gte: startDate,
            $lt: endDate
        }
    }).select("In")

    const presentDates = records.map(record => {
        return DateTime
            .fromJSDate(record.In)
            .setZone("Asia/Kolkata")
            .day
    })

    const result = []

    for (let day = 1; day <= totalDaysInMonth; day++) {

        const status = presentDates.includes(day) ? "PRESENT" : "ABSENT"

        result.push({
            day,
            status
        })
    }

    res.status(200)
        .json(new ApiResponse(200, result, "Monthly attendance fetched successfully"))
})


const getDailyAttendanceById = asyncHandler(async (req, res) => {
    if (req.user.role !== "admin") {
        throw new ApiError(403, "Forbidden request");
    }

    const { userId } = req.params;
    const { date } = req.query;

    if (!userId) {
        throw new ApiError(400, "UserId is required");
    }

    if (!date) {
        throw new ApiError(400, "Date is required (YYYY-MM-DD)");
    }

    const agent = await User.findById(userId)
        .select("fullName email avatar role isActive");

    if (!agent || agent.role !== "FE") {
        throw new ApiError(404, "FieldAgent not found");
    }

    const startOfDay = DateTime.fromISO(date, { zone: "Asia/Kolkata" })
        .startOf("day")
        .toUTC()
        .toJSDate();

    const endOfDay = DateTime.fromISO(date, { zone: "Asia/Kolkata" })
        .endOf("day")
        .toUTC()
        .toJSDate();

    const attendance = await Attendance.findOne({
        fieldAgent: userId,
        date: startOfDay
    });

    if (!attendance) {
        return res.status(200).json(
            new ApiResponse(200, {
                agentId: agent._id,
                fullName: agent.fullName,
                email: agent.email,
                avatar: agent.avatar,
                date,
                status: "NOT_CHECKED_IN",
                checkIn: null,
                checkOut: null,
                durationMinutes: 0,
                checkInImage: null,
                checkOutImage: null,
                checkInLocation: null,
                checkOutLocation: null
            }, "Daily attendance fetched successfully")
        );
    }

    const status = attendance.Out ? "COMPLETED" : "ACTIVE";

    res.status(200).json(
        new ApiResponse(200, {
            agentId: agent._id,
            fullName: agent.fullName,
            email: agent.email,
            avatar: agent.avatar,
            date,
            status,
            checkIn: attendance.In,
            checkOut: attendance.Out || null,
            durationMinutes: attendance.durationMinutes,
            checkInImage: attendance.checkInImage,
            checkOutImage: attendance.checkOutImage || null,
            checkInLocation: attendance.checkInLocation || null,
            checkOutLocation: attendance.checkOutLocation || null
        }, "Daily attendance fetched successfully")
    );
});



export { checkIn, checkOut, getMonthlyReport, getTodayStatus, getMyTodayStatus, getMyMonthlyAttendance, getMonthlyReportById, getTodayStatusById, getDailyAttendanceById }
