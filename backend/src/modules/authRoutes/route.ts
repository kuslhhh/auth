import { Router } from "express";

import { register, login, refresh, logout } from "../authController/controller";
import { requireAuth, type AuthenticatedRequest,  } from "../../middlewares/requireAuth";
import { prisma } from "../../lib/prisma";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login)
authRouter.get("/me", requireAuth, async (req: AuthenticatedRequest, res) => {
   try {
      const user = await prisma.user.findUnique({
         where: { id: req.user!.id },
         select: {
            id: true,
            email: true,
            name: true,
            role: true,
            emailVerified: true,
            createdAt: true
         }
      });
      
      if (!user) {
         return res.status(404).json({ error: "User not found" });
      }
      
      res.json({ user });
   } catch (error) {
      res.status(500).json({ error: "Internal server error" });
   }
})
authRouter.post("/refresh", refresh)
authRouter.post("/logout", logout)
