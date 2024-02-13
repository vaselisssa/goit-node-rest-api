import express from "express";
import { register, login } from "../controllers/auth/index.js";
import { authSchemas } from "../schemas/index.js";
import { validateBody } from "../midlewares/index.js";

const { registerSchema, loginSchema } = authSchemas;

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.post("/login", validateBody(loginSchema), login);

export { authRouter };
