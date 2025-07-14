import express from 'express';
import Task from '../modals/Task.js';
import helperFunction from '../helperFunction/helperFunction.js';
const router = express.Router();


 router.post("/", async (req, res) => {
    let { task } = req.body;
    let newTask = new Task({ task });
    newTask= await newTask.save();
    helperFunction(res, 201, newTask, false, 'Task created successfully');
});


 router.get("/", async (req, res) => {
    let tasks = await Task.find(); 
    helperFunction(res, 200, tasks, false, 'Task Fetch successfully');
});


 router.get("/:id", async (req, res) => {
    let task = await Task.findById(req.params.id);
    if (!task) {
        return helperFunction(res, 404, null,  true, 'Task not found');
    } 
    helperFunction(res, 200, task, false, 'Task Fetch successfully');
});


router.put("/:id", async (req, res) => {
    let { task, completed } = req.body;
    let taskFromDB = await Task.findById(req.params.id);
    if (!taskFromDB) {
        return helperFunction(res, 404, null, true, 'Task not found');
    }
    taskFromDB.task = task;
    taskFromDB.completed = completed;
    await taskFromDB.save();
    helperFunction(res, 200, taskFromDB, false, 'Task updated successfully');
});

router.delete("/:id", async (req, res) => {
    let task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return helperFunction(res, 404, null, true, 'Task not found');
    }
    helperFunction(res, 200, task, false, 'Task deleted successfully');
});






 export default router;