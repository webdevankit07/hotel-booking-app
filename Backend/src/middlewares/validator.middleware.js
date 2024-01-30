import customError from "../utils/customErrorHandler.js";

const validate = (schema) => async (req, res, next) => {
    try {
        console.log(req.body);
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (err) {
        next(new customError(422, err.errors[0].message));
    }
};

export default validate;
