// error.middleware.js
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message, stack: err.stack });
    next();
};

const tryCatchWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

module.exports = { errorHandler, tryCatchWrapper };

// tryCatchWrapper for Asynchronous Middleware/Controller Functions