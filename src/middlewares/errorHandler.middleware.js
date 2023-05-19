const logError = (err, req, res, next) => {
    console.log(err);
    next(err);
}

const errorHandler = (err, req, res, next) => {
    const { status } = err;

    return res.status(status || 500).json({
        error: err.name,
        message: err.message
        })
}

module.exports = {
    logError,
    errorHandler
}