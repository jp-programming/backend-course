const mongoose = require("mongoose");

const URL = process.env.MONGO_URL;

const mongo = { 
    connection: () => {
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log('Connected to MongoDB');
        }).catch(err => {
            console.log('Error connecting to MongoDB:', err.message);
        })
    }
};

module.exports = {
    mongo
};