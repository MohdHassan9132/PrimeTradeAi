import { DateTime } from "luxon"

const BUSINESS_ZONE = "Asia/Kolkata"

const getCurrentDateTime = () => {
    return DateTime.now()
        .toUTC()
        .toJSDate()
}

const getStartAndEndOfDay = () => {
    const nowIST = DateTime.now().setZone(BUSINESS_ZONE)

    const startUTC = nowIST
        .startOf("day")
        .toUTC()
        .toJSDate()

    const endUTC = nowIST
        .endOf("day")
        .toUTC()
        .toJSDate()

    return {
        startOfDay: startUTC,
        endOfDay: endUTC
    }
}

const getStartAndEndOfMonth = (year, month) => {
    const startIST = DateTime.fromObject(
        { year: Number(year), month: Number(month), day: 1 },
        { zone: BUSINESS_ZONE }
    )

    const startUTC = startIST
        .startOf("month")
        .toUTC()
        .toJSDate()

    const endUTC = startIST
        .endOf("month")
        .toUTC()
        .toJSDate()

    return {
        startDate: startUTC,
        endDate: endUTC,
        totalDaysInMonth: startIST.daysInMonth
    }
}

export {
    getCurrentDateTime,
    getStartAndEndOfDay,
    getStartAndEndOfMonth
}
