const mongoose = require('mongoose');
const { mongo } = require('../DB/MongoDB');

const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    name: String,
    password: String
});

const User = mongoose.model(usersCollection, usersSchema);

module.exports = class MongoContainer {
    constructor(){
        this.db = mongo;
    };

    async save(obj){
        this.db.connection();
        
        try {
            const { _id } = await User.create(obj);

            return _id;
        } catch (error) {
            console.log(error);
        }
    };

    async getById(id){
        this.db.connection();

        try {
            const data = await User.findById(id, { __v: 0 });

            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async getByName(name){
        this.db.connection();

        try {
            const data = await User.findOne({ name: name }, { __v: 0 });
            
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    async getAll(){
        this.db.connection();

        try {
            const data = await User.find();
        
            return data;
        } catch (error) {
            console.log(error);
        }

        return;
    };
};