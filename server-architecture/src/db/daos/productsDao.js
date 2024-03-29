const logger = require('../../lib/logger');
const sqlite = require('../config/sqlite');
const knex = require('knex');

module.exports = class productsDao {
    static instance;
    
    constructor(tableName) {
        if(!productsDao.instance) {
            this.options = sqlite;
            this.knex = knex(this.options);
            this.tableName = tableName;
            productsDao.instance = this;
        }

        return productsDao.instance;
    };

    reconnect() {
        this.knex = knex(this.options);
    };

    createTable(cb) {
        return this.knex.schema.hasTable(this.tableName)
        .then(exists => {
            if (!exists) 
                return this.knex.schema.createTable(this.tableName, cb);
            else return false;
        })
        .then((res) => {
            res ? logger('info', `Table ${this.tableName} created`) 
            : logger('warn', `Table ${this.tableName} already exists`);
        })
        .catch((err) => {
            logger('error', err);
        })
        .finally(() => {
            this.close();
        });
    };

    getAll() {
        this.reconnect();
        return this.knex(this.tableName).select('*')
            .then((res) => res)
            .catch((err) => logger('error', err))
            .finally(() => this.close());
    };

    insert(row) {
        this.reconnect();
        return this.knex(this.tableName).insert(row)
            .then(() => undefined)
            .catch((err) => logger('error', err))
            .finally(() => this.close());
    };

    close() {
        this.knex.destroy();
    };
}