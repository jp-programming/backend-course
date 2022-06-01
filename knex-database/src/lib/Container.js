const knex = require('knex');

module.exports = class Products {
    constructor(options, tableName) {
        this.options = options;
        this.knex = knex(this.options);
        this.tableName = tableName;
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
            res ? console.log(`Table ${this.tableName} created`) 
            : console.log(`Table ${this.tableName} already exists`);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            this.close();
        });
    };

    getAll() {
        this.reconnect();
        return this.knex(this.tableName).select('*');
    };

    insert(row) {
        this.reconnect();
        return this.knex(this.tableName).insert(row);
    };

    close() {
        this.knex.destroy();
    };
}