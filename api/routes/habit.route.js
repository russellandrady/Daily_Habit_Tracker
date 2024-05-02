import express from "express";
import { createHabit, getAllHabits, updateHabit, deleteHabit} from "../controllers/habit.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createHabit);
router.get("/all", verifyToken, getAllHabits);
router.post("/update/:id", verifyToken, updateHabit);
router.delete("/delete/:id", verifyToken, deleteHabit);

export default router;
