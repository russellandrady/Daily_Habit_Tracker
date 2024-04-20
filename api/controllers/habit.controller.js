import Habit from "../models/habit.model.js";

export const createHabit = async (req, res, next) => {
    const { habit, description } = req.body;
    const newHabit = Habit({habit, description, user: req.user.id});
    try{
    await newHabit.save();
    res.status(201).json({ message: "Habit created successfully" });
    }
    catch(err){
        next(err);
    }
};