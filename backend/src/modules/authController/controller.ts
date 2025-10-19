import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import type { RegisterInput, LoginInput } from "../../lib/zodSchema"
import { loginSchema, registerSchema, } from "../../lib/zodSchema"
import { loginUser, refreshTokens, registerUser } from "../authService/service";
import { verifyRefreshToken } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";

export const register = async (req: Request, res: Response) => {
   try {
      const validatedData: RegisterInput = registerSchema.parse(req.body)

      const { email, password, name } = validatedData;

      const user = await registerUser(email, password, name);

      res.status(201).json({
         message: "User Registered",
         user: {
            id: user.id,
            email: user.email
         }
      })
   } catch (e: any) {
      res.status(400).json({ error: e.message })
   }
}

export const login = async (req: Request, res: Response) => {
   try {
      const validatedData: LoginInput = loginSchema.parse(req.body)

      const { email, password } = validatedData;

      const { accessToken, refreshToken, user } = await loginUser(email, password)

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 1000 * 60 * 24 * 30
      })

      res.json({
         accessToken,
         user: {
            id: user.id,
            email: user.email,
            role: user.role
         }
      })
   } catch (e: any) {
      res.status(400).json({ error: e.message })
   }
}

export const refresh = async (req: Request, res: Response) => {
   try {
      const token = req.cookies.refreshToken;
      if (!token) return res.status(401).json({ error: "No refresh token" })

      const { newAccess, newRefresh } = await refreshTokens(token)

      res.cookie("refreshToken", newRefresh, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "lax",
         maxAge: 1000 * 60 * 24 * 30
      })

      res.json({ accessToken: newAccess })
   } catch (e: any) {
      res.status(401).json({ error: e.message })
   }
}

export const logout = async (req: Request, res: Response) => {
   try {
      const token = req.cookies.refreshToken
      if (token) {
         const decoded = verifyRefreshToken(token) as jwt.JwtPayload;

         await prisma.refreshToken.updateMany({
            where: {
               userId: decoded.sub as string,
            },
            data: {
               revoked: true
            }
         })
      }
      res.clearCookie("refreshToken")
      res.json({ message: "Logged Out" })
   } catch (e: any) {
      res.status(401).json({ error: e.message })
   }
}