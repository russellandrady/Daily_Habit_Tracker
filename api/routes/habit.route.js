import express from "express";
import { createHabit, getAllHabits} from "../controllers/habit.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createHabit);
router.get("/all", verifyToken, getAllHabits);

export default router;
