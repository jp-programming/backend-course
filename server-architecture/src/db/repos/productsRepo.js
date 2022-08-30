const daosFactory = require('../daosFactory');

module.exports = class productsRepo {
    constructor() {
        this.dao = new daosFactory().getDao('products');
    }

    createTable(cb) {
        return this.dao.createTable(cb);
    };

    getAll() {
        return this.dao.getAll();
    };

    insert(row) {
        return this.dao.insert(row);
    };
};
