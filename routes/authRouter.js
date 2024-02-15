import express from "express";
import {
   register,
   login,
   getCurrent,
   logout,
   updateSubscription,
} from "../controllers/auth/index.js";
import { authSchemas } from "../schemas/index.js";
import { authMiddleware, validateBody } from "../midlewares/index.js";

const { registerSchema, loginSchema, updateSubscriptionSchema } = authSchemas;

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.get("/current", authMiddleware, getCurrent);

authRouter.post("/logout", authMiddleware, logout);

authRouter.patch(
   "/",
   authMiddleware,
   validateBody(updateSubscriptionSchema),
   updateSubscription
);

export { authRouter };
