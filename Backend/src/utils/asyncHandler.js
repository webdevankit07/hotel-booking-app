const asyncHandler = (requestHandler) => async (req, res, next) => {
    try {
        await requestHandler(req, res, next);
    } catch (err) {
        next(err);
    }
};

export default asyncHandler;
