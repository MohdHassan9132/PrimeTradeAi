# API Documentation

Base URL:
/api/v1

## User Routes

POST /user/login

request

{
    "email":"primetradeai@gmail.com",
    "password":"Primetradeai@123"
}

response

{
    "statusCode": 200,
    "data": {
        "_id": "6992f4d67aadb1e53f62f576",
        "email": "primetradeai@gmail.com",
        "fullName": "primetradeai",
        "avatar": "",
        "role": "admin",
        "isActive": true,
        "tokenVersion": 2,
        "createdAt": "2026-02-16T10:43:34.327Z",
        "updatedAt": "2026-02-16T11:36:35.126Z",
        "__v": 0
    },
    "message": "User logged in successfully"
}

FE Login
request

{
    "email":"nikhil123@gmail.com",
    "password": "Nikhil123"
}
    response:
{
    "statusCode": 200,
    "data": {
        "_id": "697f36baf03793bf78192d8e",
        "email": "nikhil123@gmail.com",
        "fullName": "Nikhil",
        "role": "FE",
        "isActive": true,
        "tokenVersion": 34,
        "createdAt": "2026-02-01T11:19:22.895Z",
        "updatedAt": "2026-02-16T11:33:55.541Z",
        "__v": 0,
        "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg"
    },
    "message": "User logged in successfully"
}

Logs in a user and sets access and refresh cookies.

POST /user/logout

    response

{
    "statusCode": 200,
    "data": null,
    "message": "User logged out successfully"
}



Clears cookies and invalidates refresh token.

GET /user/getUser
Returns authenticated user details.

response

{
    "statusCode": 200,
    "data": {
        "_id": "6992f4d67aadb1e53f62f576",
        "email": "primetradeai@gmail.com",
        "fullName": "primetradeai",
        "avatar": "",
        "role": "admin",
        "isActive": true,
        "tokenVersion": 2,
        "createdAt": "2026-02-16T10:43:34.327Z",
        "updatedAt": "2026-02-16T11:36:35.252Z",
        "__v": 0
    },
    "message": "User fetched successfully"
}

POST /user/refreshAccessToken

response

{
    "statusCode": 200,
    "data": {
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTkyZjRkNjdhYWRiMWU1M2Y2MmY1NzYiLCJpYXQiOjE3NzEyNDE5NTEsImV4cCI6MTc3MzgzMzk1MX0.QZrSFTAlhbZspn6eOZ9qEpSWtRYQG6tGtmoZhYarIk8",
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTkyZjRkNjdhYWRiMWU1M2Y2MmY1NzYiLCJyb2xlIjoiYWRtaW4iLCJ0b2tlblZlcnNpb24iOjIsImlhdCI6MTc3MTI0MTk1MSwiZXhwIjoxNzcxODQ2NzUxfQ.v66cfqtau881EeZ9_IVr-b4Z9ehF2iUmY0ybVsCvn5A"
    },
    "message": "Access token refresh successfully"
}

Generates new tokens using refresh cookie.

PATCH /user/updateUserAvatar

request

form-data
image

response

{
    "statusCode": 200,
    "data": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771242003/tmt3at3aohs28qpxke9b.jpg",
    "message": "Avatar updated successfully"
}

Uploads avatar image and updates profile.

## Admin Routes

Admin can register new FE, change their passowrd, soft delete them,can get their status by today , each day and monthly wise of every FE.Can see thier working minutes for each day and thier location when they checkedIn and CheckedOut

GET /admin/getAllFieldAgentsProfile

response

{
    "statusCode": 200,
    "data": [
        {
            "_id": "697f36baf03793bf78192d8e",
            "email": "nikhil123@gmail.com",
            "fullName": "Nikhil",
            "isActive": true,
            "tokenVersion": 34,
            "createdAt": "2026-02-01T11:19:22.895Z",
            "updatedAt": "2026-02-16T11:35:17.212Z",
            "__v": 0,
            "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg"
        },
        {
            "_id": "697f6fe0757774dda38ebaa8",
            "email": "gourav@gmail.com",
            "fullName": "Gourav",
            "isActive": true,
            "tokenVersion": 11,
            "createdAt": "2026-02-01T15:23:12.867Z",
            "updatedAt": "2026-02-07T17:39:07.606Z",
            "__v": 0
        },
        {
            "_id": "697f739f74ddbcbe3dfbc8f9",
            "email": "salmanpappu@gmail.com",
            "fullName": "Salman Pappu",
            "isActive": true,
            "tokenVersion": 3,
            "createdAt": "2026-02-01T15:39:11.083Z",
            "updatedAt": "2026-02-04T21:59:32.212Z",
            "__v": 0
        },
        {
            "_id": "697f919088a07c965c6ae641",
            "email": "salman9132@gmail.com",
            "fullName": "SalmanEast",
            "isActive": true,
            "tokenVersion": 2,
            "createdAt": "2026-02-01T17:46:56.508Z",
            "updatedAt": "2026-02-04T22:01:00.565Z",
            "__v": 0
        },
        {
            "_id": "6983ae4f7fb080693252e77b",
            "email": "agent@gmail.com",
            "fullName": "NEW AGENT 1",
            "isActive": true,
            "tokenVersion": 0,
            "createdAt": "2026-02-04T20:38:39.989Z",
            "updatedAt": "2026-02-04T20:38:39.989Z",
            "__v": 0
        }
    ],
    "message": "FieldAgent profile fetched successfully"
}

POST /admin/changeFieldAgentPassworsd/:userId

request

{
    "newPassword":"Nikhil123"
}

response

{
    "statusCode": 200,
    "data": null,
    "message": "Password updated successfully"
}

POST /admin/registerFieldAgent

request

form-data

image
fullName
email
password

response

{
    "statusCode": 201,
    "data": {
        "email": "primatetradeai@123gmail.com",
        "fullName": "PrimeTradeAi",
        "role": "FE",
        "isActive": true,
        "refreshToken": "",
        "tokenVersion": 0,
        "_id": "699304a2774ee3a86d5291d2",
        "createdAt": "2026-02-16T11:50:58.408Z",
        "updatedAt": "2026-02-16T11:50:58.408Z",
        "__v": 0
    },
    "message": "User registered successfully"
}

POST /admin/toggleFieldAgent/:userId

response

{
    "statusCode": 200,
    "data": {
        "userId": "699304a2774ee3a86d5291d2",
        "isActive": false
    },
    "message": "FieldAgent deactivated successfully"
}

response

{
    "statusCode": 200,
    "data": {
        "userId": "699304a2774ee3a86d5291d2",
        "isActive": false
    },
    "message": "FieldAgent deactivated successfully"
}

GET /admin/MonthlyReport?year?&month=02

response

{
    "statusCode": 200,
    "data": [
        {
            "presentDays": 1,
            "totalMinutes": 0,
            "agentId": "697f739f74ddbcbe3dfbc8f9",
            "fullName": "Salman Pappu",
            "email": "salmanpappu@gmail.com",
            "absentDays": 27
        },
        {
            "presentDays": 4,
            "totalMinutes": 926,
            "agentId": "697f6fe0757774dda38ebaa8",
            "fullName": "Gourav",
            "email": "gourav@gmail.com",
            "absentDays": 24
        },
        {
            "presentDays": 5,
            "totalMinutes": 860,
            "agentId": "697f36baf03793bf78192d8e",
            "fullName": "Nikhil",
            "email": "nikhil123@gmail.com",
            "absentDays": 23
        }
    ],
    "message": "Monthly report fetched successfully"
}

GET /admin/getTodayStatus

response
{
    "statusCode": 200,
    "data": {
        "active": [],
        "completed": [],
        "absent": [
            {
                "_id": "697f36baf03793bf78192d8e",
                "email": "nikhil123@gmail.com",
                "fullName": "Nikhil"
            },
            {
                "_id": "697f6fe0757774dda38ebaa8",
                "email": "gourav@gmail.com",
                "fullName": "Gourav"
            },
            {
                "_id": "697f739f74ddbcbe3dfbc8f9",
                "email": "salmanpappu@gmail.com",
                "fullName": "Salman Pappu"
            },
            {
                "_id": "697f919088a07c965c6ae641",
                "email": "salman9132@gmail.com",
                "fullName": "SalmanEast"
            },
            {
                "_id": "6983ae4f7fb080693252e77b",
                "email": "agent@gmail.com",
                "fullName": "NEW AGENT 1"
            },
            {
                "_id": "699304a2774ee3a86d5291d2",
                "email": "primatetradeai@123gmail.com",
                "fullName": "PrimeTradeAi"
            }
        ]
    },
    "message": "Today status fetched successfully"
}

GET /admin/getMonthlyReportById/:userId?year=?&month=?

response

{
    "statusCode": 200,
    "data": {
        "agentId": "697f36baf03793bf78192d8e",
        "fullName": "Nikhil",
        "email": "nikhil123@gmail.com",
        "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg",
        "presentDays": 5,
        "absentDays": 23,
        "totalMinutes": 860,
        "dailyAttendance": [
            {
                "day": 1,
                "status": "ABSENT"
            },
            {
                "day": 2,
                "status": "ABSENT"
            },
            {
                "day": 3,
                "status": "PRESENT"
            },
            {
                "day": 4,
                "status": "PRESENT"
            },
            {
                "day": 5,
                "status": "PRESENT"
            },
            {
                "day": 6,
                "status": "PRESENT"
            },
            {
                "day": 7,
                "status": "PRESENT"
            },
            {
                "day": 8,
                "status": "ABSENT"
            }
        ]
    },
    "message": "Monthly report fetched successfully"
}

GET /admin/getFieldAgentById/:userId

response

{
    "statusCode": 200,
    "data": {
        "_id": "697f36baf03793bf78192d8e",
        "email": "nikhil123@gmail.com",
        "fullName": "Nikhil",
        "role": "FE",
        "isActive": true,
        "tokenVersion": 34,
        "createdAt": "2026-02-01T11:19:22.895Z",
        "updatedAt": "2026-02-16T11:43:40.585Z",
        "__v": 0,
        "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg"
    },
    "message": "FieldAgent profile fetched successfully"
}

GET /admin/getTodayStatusById/:userId

{
    "statusCode": 200,
    "data": {
        "agentId": "697f36baf03793bf78192d8e",
        "fullName": "Nikhil",
        "email": "nikhil123@gmail.com",
        "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg",
        "status": "NOT_CHECKED_IN",
        "checkIn": null,
        "checkOut": null,
        "durationMinutes": 0,
        "checkInLocation": null,
        "checkOutLocation": null
    },
    "message": "Today status fetched successfully"
}


GET /admin/getDailyAttendanceById/:userId?date=YYYY-MM-DD

response
{
    "statusCode": 200,
    "data": {
        "agentId": "697f36baf03793bf78192d8e",
        "fullName": "Nikhil",
        "email": "nikhil123@gmail.com",
        "avatar": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1769958290/ssryo8lzcys7yeogfvqi.jpg",
        "date": "2026-02-04",
        "status": "COMPLETED",
        "checkIn": "2026-02-03T22:24:52.324Z",
        "checkOut": "2026-02-04T11:31:44.919Z",
        "durationMinutes": 786,
        "checkInImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1770157495/uzt00hrkalnhfzpjc2go.jpg",
        "checkOutImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1770204708/mis7zsdddvtehmagsimn.jpg",
        "checkInLocation": {
            "latitude": 28.6563675,
            "longitude": 77.210978
        },
        "checkOutLocation": {
            "latitude": 28.5666866,
            "longitude": 77.200408
        }
    },
    "message": "Daily attendance fetched successfully"
}

## Attendance Routes

Field agents can checkIn Checkout.
See their daily and monthly attendance

POST /attendance/chechIn

requset
form-data

image
longitude
latitude


response
{
    "statusCode": 201,
    "data": {
        "fieldAgent": "697f36baf03793bf78192d8e",
        "date": "2026-02-15T18:30:00.000Z",
        "In": "2026-02-16T17:48:25.821Z",
        "durationMinutes": 0,
        "checkInImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771264117/ufifzkhvtvfwsaeylbpy.jpg",
        "checkInImagePublicId": "ufifzkhvtvfwsaeylbpy",
        "checkInLocation": {
            "latitude": 77.21098085082656,
            "longitude": 28.656387097202852
        },
        "_id": "6993586f5f5d552ecb0008b4",
        "createdAt": "2026-02-16T17:48:31.089Z",
        "updatedAt": "2026-02-16T17:48:31.089Z",
        "__v": 0
    },
    "message": "CheckIn successful."
}

PATCH /attendance/checkOut

request

form-data
image
longitude
latitude

response
{
    "statusCode": 200,
    "data": {
        "checkInLocation": {
            "latitude": 77.21098085082656,
            "longitude": 28.656387097202852
        },
        "checkOutLocation": {
            "latitude": 77.206684,
            "longitude": 28.6558574
        },
        "_id": "6993586f5f5d552ecb0008b4",
        "fieldAgent": "697f36baf03793bf78192d8e",
        "date": "2026-02-15T18:30:00.000Z",
        "In": "2026-02-16T17:48:25.821Z",
        "durationMinutes": 4,
        "checkInImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771264117/ufifzkhvtvfwsaeylbpy.jpg",
        "checkInImagePublicId": "ufifzkhvtvfwsaeylbpy",
        "createdAt": "2026-02-16T17:48:31.089Z",
        "updatedAt": "2026-02-16T17:53:10.571Z",
        "__v": 0,
        "checkOutImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771264394/xcfqefxtgjztdwbgywpk.jpg",
        "checkOutImagePublicId": "xcfqefxtgjztdwbgywpk",
        "Out": "2026-02-16T17:53:03.543Z"
    },
    "message": "CheckOut successful."
}

GET /attendance/getMyTodayStatus

response

{
    "statusCode": 200,
    "data": {
        "status": "COMPLETED",
        "checkIn": "2026-02-16T17:48:25.821Z",
        "checkOut": "2026-02-16T17:53:03.543Z",
        "durationMinutes": 4,
        "checkInImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771264117/ufifzkhvtvfwsaeylbpy.jpg",
        "checkOutImage": "https://res.cloudinary.com/dc9mp3nsr/image/upload/v1771264394/xcfqefxtgjztdwbgywpk.jpg"
    },
    "message": "Today status fetched successfully"
}

GET attendance/getMyMontlyStatus?year?&month?

response

{
    "statusCode": 200,
    "data": [
        {
            "day": 1,
            "status": "ABSENT"
        },
        {
            "day": 2,
            "status": "ABSENT"
        },
        {
            "day": 3,
            "status": "PRESENT"
        },
        {
            "day": 4,
            "status": "PRESENT"
        },
        {
            "day": 5,
            "status": "PRESENT"
        },
        {
            "day": 6,
            "status": "PRESENT"
        },
        {
            "day": 7,
            "status": "PRESENT"
        },
        {
            "day": 8,
            "status": "ABSENT"
        },
        {
            "day": 9,
            "status": "ABSENT"
        },
        {
            "day": 10,
            "status": "ABSENT"
        },
        {
            "day": 11,
            "status": "ABSENT"
        },
        {
            "day": 12,
            "status": "ABSENT"
        },
        {
            "day": 13,
            "status": "ABSENT"
        },
        {
            "day": 14,
            "status": "ABSENT"
        },
        {
            "day": 15,
            "status": "ABSENT"
        },
        {
            "day": 16,
            "status": "PRESENT"
        }
    ],
    "message": "Monthly attendance fetched successfully"
}




## Status Codes

200 success
400 validation error
401 unauthorized
403 forbidden
404 not found
498 access token expired
500 server error
503 media error
