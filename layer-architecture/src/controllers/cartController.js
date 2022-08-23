const logger = require('../lib/logger');
const doCheckout = require('../services/cart')

const render = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const user = {
        name,
        age,
        address,
        phone,
        email
    } = req.user;
    
    res.render('cart', user);
};

const checkout = async (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const user = {
        name,
        phone,
        email
    } = req.user;

    const isCheckout = await doCheckout(user);

    isCheckout 
        ? res.redirect('/app/cart')
        : res.redirect('/app')
};

module.exports = {
    render,
    checkout
};