
import { Router } from "express";
import { getAllPassengers, getAllDrivers, deleteUser, updateUser, getUserById } from "../controllers/adminController.js";

const router = Router();

router.get("/passengers", getAllPassengers);
router.get("/drivers", getAllDrivers);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserById);

export default router;
