const passport = require('passport');
const logger = require('../lib/logger');
const LocalStrorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStrorage('./localStorage');

const render = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const user = {
        name,
        age,
        address,
        phone,
        email
    } = req.user;

    localStorage.setItem('email', JSON.stringify(user.email));
    res.render('main', user);
};

const register = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    if( req.isAuthenticated() ) res.redirect('/app');
    else res.render('register');
};

const registerAuth = passport.authenticate('register', 
    { failureRedirect: '/app/register-error', successRedirect: '/app/login' });

const registerError = (req, res) => res.render('register-error');

const login = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    if( req.isAuthenticated() ) res.redirect('/app');
    else res.render('login');
};

const loginAuth = passport.authenticate('login', 
    { failureRedirect: '/app/login-error', successRedirect: '/app' });

const loginError = (req, res) => res.render('login-error');

const logout = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    req.logout(err => {
        res.redirect('/app/login')
        localStorage.removeItem('email');
    });
};

const productTest = (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    res.render('productsTest')
};

module.exports = {
    render,
    register,
    registerAuth,
    registerError,
    login,
    loginAuth,
    loginError,
    logout,
    productTest
};