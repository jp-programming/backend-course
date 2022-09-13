const logger = require('../lib/logger');
const products = require('../services/products');

const get = async (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const { id } = req.params;
    res.json(await products.get({ id }));
};

const create = async (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const data = {
        name, price, thumbnail
    } = req.body;

    res.json(await products.create({ data }));
};

const update = async (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const { id } = req.params;
    const data = {
        name, price, thumbnail
    } = req.body;

    res.json(await products.updateById({ id, data }));
};

const remove = async (req, res) => {
    logger('info', `${req.method} ${req.originalUrl}`);
    const { id } = req.params;
    res.json(await products.deleteById({ id }));
};

module.exports = {
    get, 
    create, 
    update, 
    remove
};