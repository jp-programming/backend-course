const Container = require('./lib/Container');

const mysql = require('../options/mysql');
const sqlite = require('../options/sqlite');

const pd = new Container(mysql, 'products');
const chat = new Container(sqlite, 'messages');

pd.createTable(
    (table) => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.float('price').notNullable();
        table.string('thumbnail', 255).notNullable();
    }
);

chat.createTable(
    (table) => {
        table.increments('id').primary();
        table.string('email', 50).notNullable();
        table.string('text', 200).notNullable();
        table.string('date', 25).notNullable();
    }
);

module.exports = {
    pd,
    chat
};