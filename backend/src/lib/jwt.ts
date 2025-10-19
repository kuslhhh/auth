import * as jwt from "jsonwebtoken"
import { env } from "../config/env"

export const signAccessToken = (payload: object) => {
   return jwt.sign(payload, env.ACCESS_SECRET, { expiresIn: env.ACCESS_EXPIRES_IN })
}

export const signRefreshToken = (payload: object) => {
   return jwt.sign(payload, env.REFRESH_SECRET, { expiresIn: env.REFRESH_EXPIRES_DAYS })
}

export const verifyAccesssToken = (token: string) => {
   return jwt.verify(token, env.ACCESS_SECRET)
}

export const verifyRefreshToken = (token: string) => {
   return jwt.verify(token, env.REFRESH_SECRET)
}
