import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { corsOptions } from "./config/cors.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public/temp"));

app.use(cors(corsOptions));
app.use(cookieParser());

import {userRouter} from './routes/user.routes.js'

app.use("/api/v1/user",userRouter)


import {errorMiddleware} from './middlewares/error.middleware.js'
app.use(errorMiddleware)

export { app };
