import Habit from "../models/habit.model.js";
import {errorHandler} from "../utils/error.js";

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
export const updateHabit = async (req, res, next) => {

    try {
      const updatedHabit = await Habit.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            habit: req.body.habit,
            description: req.body.description,
            day1: req.body.day1,
            day2: req.body.day2,
            day3: req.body.day3,
            day4: req.body.day4,
            day5: req.body.day5,
            day6: req.body.day6,
            day7: req.body.day7,
          },
        },
        { new: true } //for seeing the updated user in front end.
      );
      if(updatedHabit===null){
        return next(errorHandler(404, "Habit not found"));
      }
      res.status(200).json(updatedHabit);
    } catch (err) {
      next(err);
    }
  };

  export const deleteHabit = async (req, res, next) => {
    try {
      await Habit.findByIdAndDelete(req.params.id);
      res.status(200).json("Habit has been deleted");
    } catch (err) {
      next(err);
    }
  };