import Habit from "../models/habit.model.js";

export const createHabit = async (req, res, next) => {
    const { habit, description } = req.body;
    const newHabit = Habit({habit, description, user: req.user.id});
    try{
    await newHabit.save();
    res.status(203).json({ message: "Habit created successfully" });
    }
    catch(err){
        next(err);
    }
};

export const getAllHabits = async (req, res, next) => {
    try{
        const habits = await Habit.find({ user: req.user.id });
        res.status(203).json(habits);

    }
    catch(err){
        next(err);
    }
};