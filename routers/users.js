import express from 'express';
import helperFunction from '../helperFunction/helperFunction.js';
import verifyToken from '../middleware/middleware.js';
import User from '../modals/User.js';
const router = express.Router();

router.put('/:id', verifyToken, async (req, res) => { // Update user route
    try {
        const userId = req.params.id;
        const updateData = req.body;
        const updateUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        );
        if (!updateUser) return helperFunction(res, 404, null, true, 'User not found');
        helperFunction(res, 200, updateUser, false, 'User updated successfully');
    } catch (error) {
        console.error("Error updating user:", error);
        helperFunction(res, 500, null, true, 'Internal Server Error');
    }
});

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const userId = req.params.id;
        const deleteUser = await User.findByIdAndDelete(userId);
        if (!deleteUser) return helperFunction(res, 404, null, true, 'User not found');
        helperFunction(res, 200, deleteUser, false, 'User deleted successfully');
    } catch (error) {
        console.error("Error deleting user:", error);
        helperFunction(res, 500, null, true, 'Internal Server Error');
    }
});
.

export default router;
