const { auth } = require('../middlewares/auth');
const appRouter = require('express').Router();
const passport = require('passport');

appRouter.get('/', auth, (req, res) => {
    res.render('main', { user: req.user.name });
});

appRouter.get('/register', (req, res) => {
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
    req.logout(err => {
        res.redirect('/app/login')
    });
});

appRouter.get('/products-test', (req, res) => {
    res.render('productsTest')
});

module.exports = appRouter;