import User from '../models/user.model';

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
        return ApiError(500, 'Error while generating access and refresh token');
    }
};

const registerUser = async (req, res) => {
    try {
    } catch (error) {}
};

export { registerUser };
