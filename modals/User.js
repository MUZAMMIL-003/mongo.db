import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        email: {type: String, unique: true, required: true},
        password: {type: String, required: true},
        gender: {type: String, enum: ["male", "female"] },
        city: {type: String, },
        dob: {type: String, },
        isProfileCompleted: {type: Boolean, default: false },
    },
        {timestamps: true}
)
const User = mongoose.model("Users", userSchema); 
       
export default User;