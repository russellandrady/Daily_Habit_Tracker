import mongoose from "mongoose";
import User from "../models/user.model.js";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    habit: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    day1: {
      type: Number,
      default: null,
    },
    day2: {
      type: Number,
      default: null,
    },
    day3: {
      type: Number,
      default: null,
    },
    day4: {
      type: Number,
      default: null,
    },
    day5: {
      type: Number,
      default: null,
    },
    day6: {
      type: Number,
      default: null,
    },
    day7: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);
const Habit = mongoose.model("Habit", habitSchema); //this User should be singular because mongoos automatically add a 's'. And the first letter shuld be capital.
export default Habit;
