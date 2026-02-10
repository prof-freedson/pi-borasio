
import { Router } from "express";
import { getAllPassengers, getAllDrivers, deleteUser } from "../controllers/adminController.js";

const router = Router();

router.get("/passengers", getAllPassengers);
router.get("/drivers", getAllDrivers);
router.delete("/users/:id", deleteUser);

export default router;
