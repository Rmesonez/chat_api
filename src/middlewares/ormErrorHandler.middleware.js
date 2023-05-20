const {
    ValidationError,
    DatabaseError,
    ConnectionError,
    ConnectionRefusedError,
    ConnectionTimedOutError,
    InvalidConnectionError,
    ConnectionAcquireTimeoutError,
} = require('sequelize');

const ormErrorHandler = (err, req, res, next) => {
    if(
        err instanceof ConnectionError ||
        err instanceof ConnectionRefusedError ||
        err instanceof ConnectionTimedOutError ||
        err instanceof InvalidConnectionError ||
        err instanceof ConnectionAcquireTimeoutError
    )
    {
        return res.status(409).json({
            name: err.name,
            message: 'Database connection error'
        })
    }
    if(err instanceof DatabaseError){
        return res.status(409).json({
            name: err.name,
            message: err.message,
            errors: err.errors
        })
    }
    if(err instanceof ValidationError){
        return res.status(400).json({
            name: err.name,
            message: err.message,
            errors: err.errors.map(error => error.message)
        })
    }
    next(err);
}

module.exports = ormErrorHandler;