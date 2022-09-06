const infoRouter = require('express').Router();
const { details, cpus } = require('../controllers/infoController');

infoRouter.get('/', details);

module.exports = {
    infoRouter,
    cpus
};