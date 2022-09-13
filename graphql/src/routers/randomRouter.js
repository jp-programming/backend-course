const randomRouter = require('express').Router(); 
const getRandomNumbers  = require('../controllers/randomController');    

randomRouter.get('/', getRandomNumbers);

module.exports = randomRouter;
