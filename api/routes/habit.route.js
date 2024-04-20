import express from "express";
import { createHabit} from "../controllers/habit.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createHabit);

export default router;
