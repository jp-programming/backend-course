const logger = require('../lib/logger');
const graphqlRouter = require('express').Router();
const graphql = require('../controllers/graphqlController');

graphqlRouter.use('/graphql', (req, res, next) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    next();
}, graphql);

module.exports = graphqlRouter;