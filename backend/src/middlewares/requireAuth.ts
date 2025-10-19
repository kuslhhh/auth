import type { NextFunction, Request, Response } from "express"
import jwt, { type JwtPayload } from "jsonwebtoken"
import { env } from "../config/env"
import type { StringLike } from "bun"

export interface AuthUser {
   id: string,
   role: "USER" | "ADMIN"
}

export interface AuthenticatedRequest extends Request {
   user?: AuthUser
}

export const requireAuth = (
   req: AuthenticatedRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader?.startsWith("Bearer "))
         return res.status(401).json({ error: "Missing or invalid token" })

      const token = authHeader.split(" ")[1];

      if (!token) {
         return res.status(401).json({ error: "Missing or invalid token" })
      }

      const decoded = jwt.verify(token, env.ACCESS_SECRET) as jwt.JwtPayload

      req.user = {
         id: decoded.sub as string,
         role: decoded.role as "USER" | "ADMIN"
      }
      next();
   } catch (e: any) {
      res.status(401).json({ error: "Unauthorised" })
   }
}
