const ApiResponse = ({ statusCode, data, message = 'success' }) => {
    return { statusCode, data, message, success: statusCode < 400 };
};

export default ApiResponse;
