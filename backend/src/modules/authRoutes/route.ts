import { Router } from "express";

import { register, login, refresh, logout } from "../authController/controller";
import { requireAuth, type AuthenticatedRequest,  } from "../../middlewares/requireAuth";

export const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login)
authRouter.get("/me", requireAuth, (req: AuthenticatedRequest, res) => {
   res.json({ message: "hey" })
})
authRouter.post("/refresh", refresh)
authRouter.post("/logout", logout)
