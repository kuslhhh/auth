import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { authRouter } from "./modules/authRoutes/route"

export const app = express();

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)