import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import customError from '../utils/customErrorHandler.js';

// ------------------ Utilies -----------------------//
const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error.message);
        new customError(500, error.message);
    }
};

const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24, // 1 days
};

const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 10, // 10 days...
};

// ------------------ Controllers --------------------------------//
export const registerUser = asyncHandler(async (req, res, next) => {
    const { fullName, userName, email, password } = req.body;

    const isUserExisted = await User.findOne({ $or: [{ userName }, { email }] });
    if (isUserExisted) {
        return next(new customError(409, 'User already exists'));
    }

    const user = await User.create({
        fullName,
        userName: userName.toLowerCase(),
        email,
        password,
    });

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Response...
    return res
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .status(201)
        .json(new ApiResponse(200, { userId: user._id }, 'User successfully registered'));
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return next(new customError(400, 'Invalid Credentials'));
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return next(new customError(400, 'Invalid Credentials'));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Response...
    return res
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .status(200)
        .json(new ApiResponse(200, { userId: user._id }, 'User logged in successfully'));
});

export const validateToken = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, { userId: req.user._id }, 'user valid'));
});

export const getUserDetails = asyncHandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, { user: req.user }, 'success'));
});

export const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    // Response....
    const options = { httpOnly: true, secure: true };
    res.status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, { userId: req.user._id }, 'user logged out successfully'));
});
