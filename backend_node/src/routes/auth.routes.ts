
import { Router } from "express";
import { registerPassenger, registerDriver } from "../controllers/authController.js";
// Note a extensão .js obrigatória em ESM com TypeScript/Node moderno sem bundler complexo se tsconfig.json pede

const authRoutes = Router();

authRoutes.post("/register/passageiro", registerPassenger);
authRoutes.post("/register/motorista", registerDriver);

// Futuramente: Login
// authRoutes.post("/login", loginUser);

export default authRoutes;
