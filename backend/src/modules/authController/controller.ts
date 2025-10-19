import type { Request, Response } from "express";
import type { RegisterInput, LoginInput } from "../../lib/zodSchema"
import { loginSchema, registerSchema, } from "../../lib/zodSchema"
import { loginUser, registerUser } from "../authService/service";

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