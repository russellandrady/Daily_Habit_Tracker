import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const register = async(req, res, next) => {
    const { username, email, password } = req.body;
    const hashedpassword = await bcryptjs.hash(password, 12);
    const newUser = User({username, email, password: hashedpassword});
    try{
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
    }
    catch(err){
        next(err);
    }
}