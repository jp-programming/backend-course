const cartRouter = require('express').Router();
const cart = require('../controllers/cartController');

cartRouter.get('/', cart.render);
cartRouter.get('/checkout', cart.checkout);

module.exports = {
    cartRouter
};