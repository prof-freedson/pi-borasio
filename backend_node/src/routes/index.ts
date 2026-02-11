
import { Router } from "express";
import authRoutes from "./auth.routes.js";
import homeRoutes from "./home.routes.js";
import adminRoutes from "./admin.routes.js";
import caronaRoutes from "./carona.routes.js"; // Import new routes

const router = Router();

router.use("/auth", authRoutes);
router.use("/", homeRoutes);
router.use("/admin", adminRoutes);
router.use("/caronas", caronaRoutes); // Use new routes

export default router;
