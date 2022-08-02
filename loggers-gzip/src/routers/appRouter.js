const { auth } = require('../middlewares/auth');
const logger = require('../lib/logger');
const appRouter = require('express').Router();
const passport = require('passport');

appRouter.get('/', auth, (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    res.render('main', { user: req.user.name });
});

appRouter.get('/register', (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    if( req.isAuthenticated() ) res.redirect('/app');
    else res.render('register');
});

appRouter.post('/registerAuth', passport.authenticate('register', 
    { failureRedirect: '/app/register-error', successRedirect: '/app/login' }
));

appRouter.get('/register-error', (req, res) => {
    res.render('register-error');
});

appRouter.get('/login', (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    if( req.isAuthenticated() ) res.redirect('/app');
    else res.render('login');
});

appRouter.post('/loginAuth', passport.authenticate('login', 
    { failureRedirect: '/app/login-error', successRedirect: '/app' }
));

appRouter.get('/login-error', (req, res) => {
    res.render('login-error');
});

appRouter.get('/logout', (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    req.logout(err => {
        res.redirect('/app/login')
    });
});

appRouter.get('/products-test', (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    res.render('productsTest')
});

module.exports = appRouter;