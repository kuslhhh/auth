import type { Request, Response } from "express";
import { authSchema } from "../utils/authSchema";
import prisma from "../utils/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
   const parseResult = authSchema.safeParse(req.body)
   if (!parseResult.success) {
      return res.status(400).json({ errors: parseResult.error })
   }

   const { email, password } = parseResult.data;

   try {
      const existingUser = await prisma.user.findUnique({
         where: { email }
      })

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
         data: {
            email,
            password: hashedPassword
         }
      });

      const { accessToken, refreshToken } = generateToken(user.id)

      res
         .cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 1000,
         })
         .json({ accessToken })
   } catch (e) {
      res.status(500).json({ message: "Inrernal server error" })
   }
}

