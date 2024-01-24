import User from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/customErrorHandler.js';

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

const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, userName, email, password } = req.body;

    const isUserExisted = await User.findOne({ $or: [{ userName }, { email }] });
    ApiError(next, isUserExisted, 409, 'User already exists');

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
    ApiError(next, !createdUser, 409, 'Error while finding created user');

    const options = { httpOnly: true, secure: process.env.NODE_ENV === 'production' };
    return res
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .status(200)
        .json({ success: true, createdUser });
});

export { registerUser };
