const ApiError = (
    condition,
    statusCode,
    message = 'something went wrong',
    error = 'Internal server error!'
) => {
    if (condition) {
        return { success: false, statusCode, message, error };
    }
};

export default ApiError;
