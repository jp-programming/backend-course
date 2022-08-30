const daosFactory = require('./db/daosFactory');

const pd = new daosFactory().getDao('products');

pd.createTable(
    (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.float('price').notNullable();
        table.string('thumbnail', 255).notNullable();
    }
);

module.exports = {
    pd
};