import { NODE_ENV } from '../conf/index.js';

const devErros = (res, err) => {
    return res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.message,
        stackTrace: err.stack,
        error: err,
    });
};

const prodErrors = (res, err) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({ status: err.statusCode, message: err.message });
    } else {
        return res.status(err.statusCode).json({
            status: 'error',
            message: 'Something went wrong! Please try again later',
        });
    }
};

const globalErrorHandler = (err, _, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (NODE_ENV === 'development') {
        devErros(res, err);
    } else if (NODE_ENV === 'production') {
        prodErrors(res, err);
    }
};

export default globalErrorHandler;
