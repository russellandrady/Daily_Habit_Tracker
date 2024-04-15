import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
 const User = mongoose.model('User', userSchema);//this User should be singular because mongoos automatically add a 's'. And the first letter shuld be capital.
 export default User;