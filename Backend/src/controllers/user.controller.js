import User from '../models/user.model.js';
import ApiResponse from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import customError, { ApiError } from '../utils/customErrorHandler.js';
import { accessTokenOptions, refreshTokenOptions } from '../utils/utilts.js';

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
        console.log(error.message);
        new customError(500, error.message);
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

    const createdUser = await User.findById(user._id).select('-password -refreshToken');
    ApiError(next, !createdUser, 409, 'Error while finding created user');

    // Response...
    return res
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .status(201)
        .json(
            new ApiResponse(
                200,
                { user: createdUser, accessToken, refreshToken },
                'User successfully registered'
            )
        );
});

const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    ApiError(next, !user, 400, 'Invalid Credentials');

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    ApiError(next, !isPasswordCorrect, 400, 'Invalid Credentials');

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select('-password -refreshToken');

    // Response...
    return res
        .cookie('accessToken', accessToken, accessTokenOptions)
        .cookie('refreshToken', refreshToken, refreshTokenOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                'User logged in successfully'
            )
        );
});

export { registerUser, loginUser };
