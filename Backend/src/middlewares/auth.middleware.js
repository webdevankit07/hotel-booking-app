import { ACCESS_TOKEN_SECRET } from '../conf/index.js';
import User from '../models/user.model.js';
import customError from '../utils/customErrorHandler.js';
import jwt from 'jsonwebtoken';

const verifyToken = async (req, _, next) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        return next(new customError(401, 'unauthorized'));
    }

    try {
        const decodeToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
        if (!decodeToken) {
            return next(new customError(401, 'unauthorized'));
        }

        const user = await User.findById(decodeToken._id).select('-password -refreshToken');
        if (!user) {
            return next(new customError(401, 'Invalid access token'));
        }

        req.user = user;
        next();
    } catch (error) {
        return new customError(401, 'Invalid access token');
    }
};

export default verifyToken;
