import { validationResult } from 'express-validator';
import User from '../models/user.model.js';

// generate Access and Refresh Token....
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message: process.env.NODE_ENV === '' ? error.message : 'Internal server error',
            status: false,
        });
    }
};

const registerUser = async (req, res) => {
    try {
        const { fullName, userName, email, password } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ status: 400, message: errors.array() });
        }

        const isUserExisted = await User.findOne({ $or: [{ userName }, { email }] });
        if (isUserExisted) {
            return res.status(401).json({ status: 401, message: 'user already existed' });
        }

        const user = await User.create({
            fullName,
            userName: userName.toLowerCase(),
            email,
            password,
        });

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);
        user.refreshToken = refreshToken;
        await user.save();

        const createdUser = await User.findById(user._id).select('-password -refreshToken');
        if (!createdUser) {
            return res
                .status(409)
                .json({ status: 409, message: 'Error while finding created user' });
        }

        const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
        return res
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .status(200)
            .json({ success: true, createdUser });
    } catch (error) {
        return res.status(500).json({
            message:
                process.env.NODE_ENV === 'production'
                    ? error.message
                    : 'Something went wrong !! Internal server error',
            status: false,
        });
    }
};

export { registerUser };
