import express from 'express';
const router = express.Router();


router.put('/',async (req, res) => {
    console.log("authurization=>" , req.headers.authorization);
    res.send('Update user');
});

export default router;
