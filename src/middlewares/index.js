const ormError = require('./ormErrorHandler.middleware');
const {
    errorHandler,
    logError,

} = require('./errorHandler.middleware');

const errorRoutes = (app) => {
    app.use(logError);
    app.use(ormError);
    app.use(errorHandler);

    //manejar el 404
    app.use('*', (req, res) => res.status(404).json(
        { 
            message: 'The route you want to get is temporaly out of service' 
        }));
}

module.exports = errorRoutes;
