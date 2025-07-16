import helperFunction from '../helperFunction/helperFunction.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (req, res, next) => {
    console.log("Middleware is running...");

    const authHeader = req?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return helperFunction(res, 401, null, true, 'No token provided or invalid format');
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env['AUTH-SECRET'], (err, decoded) => {
        if (err) {
            console.error("JWT verification failed:", err);
            return helperFunction(res, 403, null, true, 'Failed to authenticate token');
        }

        console.log("User verified:", decoded);
        req.user = decoded;
        next();
    });
};

export default verifyToken;
