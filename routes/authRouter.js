import express from "express";
import { register } from "../controllers/auth/index.js";
import { authSchemas } from "../schemas/index.js";
import { validateBody } from "../midlewares/index.js";

const { registerSchema } = authSchemas;

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

export { authRouter };
