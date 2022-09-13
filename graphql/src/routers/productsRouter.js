const productsRouter = require('express').Router();
const products = require('../controllers/productsController');

productsRouter.get('/:id?', products.get);
productsRouter.post('/', products.create);
productsRouter.put('/:id?', products.update);
productsRouter.delete('/:id?', products.remove);

module.exports = productsRouter;