import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
    {
        task: {type:  String, required: true},
        completed: {type: Boolean, default: false },
    },
        {timestamps: true}
)
const Task = mongoose.model("Tasks", taskSchema);        
export default Task;