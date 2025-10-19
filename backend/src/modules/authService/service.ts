import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma"
import { env } from "../../config/env";
import { signAccessToken, signRefreshToken } from "../../lib/jwt";

export const registerUser = async (email: string, password: string, name?: string) => {
   const existing = await prisma.user.findUnique({ where: { email } });
   if (existing) throw new Error("Email already exists")

   const hashed = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS)
   const user = await prisma.user.create({
      data: {
         name,
         email,
         password: hashed,
      }
   })
   return user;
}

export const loginUser = async (email: string, password: string) => {
   const user = await prisma.user.findUnique({ where: { email } })
   if (!user) throw new Error("User not Exists")

   const valid = await bcrypt.compare(password, user.password);
   if (!valid) throw new Error("Invalid Crediatials")

   const accessToken = signAccessToken({ sub: user.id, role: user.role })
   const refreshToken = signRefreshToken({ sub: user.id })

   const hashedRT = await bcrypt.hash(refreshToken, env.BCRYPT_SALT_ROUNDS)
   const expires = new Date();
   expires.setDate(expires.getDate() + env.REFRESH_EXPIRES_DAYS)

   await prisma.refreshToken.create({
      data: {
         userId: user.id,
         hashedToken: hashedRT,
         expiresAt: expires
      }
   })

   return { user, accessToken, refreshToken }
}
