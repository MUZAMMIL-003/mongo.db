import express from 'express';
import User from '../modals/User.js';
import bcrypt from 'bcrypt';
import "dotenv/config";
import Joi from 'joi';
import helperFunction from '../helperFunction/helperFunction.js';
import jwt from 'jsonwebtoken';


const router = express.Router();


const registerSchema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6)
});



const loginSchema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(6).required()
});


router.post("/register", async (req, res) => {
    const { error, value } = registerSchema.validate(req.body);
    console.log("error=>", error)
    if (error) return helperFunction(res, 400, null, true, error);
    const user = await User.findOne({ email: value.email });
    if (user) return helperFunction(res, 403, null, true, 'User already exists');

    const hashedPassword = await bcrypt.hash(value.password, 12);
    console.log("hashedPassword=>", hashedPassword);
    value.password = hashedPassword;

    let newUser = new User({ ...value });
    newUser = await newUser.save();

    helperFunction(res, 201, newUser, false, 'User registered successfully');

});


router.post("/login", async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return helperFunction(res, 400, null, true, error);

    const user = await User.findOne({ email: value.email }).lean();
    if (!user) return helperFunction(res, 403, null, true, 'User is not registered');

    const isPasswordValid = await bcrypt.compare(value.password, user.password);
    if (!isPasswordValid) return helperFunction(res, 403, null, true, 'Invalid password');

    const token = jwt.sign(user, process.env['AUTH-SECRET']);

    helperFunction(res, 200, { user, token }, false, 'User login successfully');
});





export default router;