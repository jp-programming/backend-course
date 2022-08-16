const mongoose = require('mongoose');
const { mongo } = require('../DB/MongoDB');
const logger = require('./logger');

const cartCollection = 'cart';

const cartSchema = new mongoose.Schema({
    email: String,
    products: [{
        id: Number,
        quantity: Number,
        subTotal: Number
    }],
    total: Number
});

const Cart = mongoose.model(cartCollection, cartSchema);

module.exports = class MongoContainer {
    constructor(){
        this.db = mongo;
    };

    async save(obj){
        this.db.connection();
        
        try {
            const { _id } = await Cart.create(obj);

            return _id;
        } catch (error) {
            logger('error', error);
        }
    };

    async getByEmail(email){
        this.db.connection();

        try {
            const data = await User.findOne({ email: email }, { __v: 0 });
            
            return data;
        } catch (error) {
            logger('error', error);
        }
    };

    async getAll(){
        this.db.connection();

        try {
            const data = await User.find();
        
            return data;
        } catch (error) {
            logger('error', error);
        }

        return;
    };
};