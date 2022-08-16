const cartRouter = require('express').Router();
const logger = require('../lib/logger');

cartRouter.get('/', (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const user = {
        name,
        age,
        address,
        phone,
        email
    } = req.user;
    
    res.render('cart', user);
});

module.exports = {
    cartRouter
};