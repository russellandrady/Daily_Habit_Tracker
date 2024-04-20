import express from "express";
import { createHabit, getAllHabits, updateHabit} from "../controllers/habit.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createHabit);
router.get("/all", verifyToken, getAllHabits);
router.post("/update/:id", verifyToken, updateHabit);

export default router;
