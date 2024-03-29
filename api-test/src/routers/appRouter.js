const appRouter = require('express').Router();
const { auth } = require('../middlewares/auth');
const productsRouter = require('./productsRouter');
const cartRouter = require('./cartRouter');
const app = require('../controllers/appController');

appRouter.get('/', auth, app.render);
appRouter.get('/register', app.register);
appRouter.post('/registerAuth', app.registerAuth);
appRouter.get('/register-error', app.registerError);
appRouter.get('/login', app.login);
appRouter.post('/loginAuth', app.loginAuth);
appRouter.get('/login-error', app.loginError);
appRouter.get('/logout', app.logout);
appRouter.get('/products-faker', app.productTest);

appRouter.use('/products', productsRouter);
appRouter.use('/cart', auth, cartRouter);

module.exports = appRouter;