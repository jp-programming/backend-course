const mongoose = require("mongoose");

const URL = `mongodb+srv://root:root@cluster0.pxkve3d.mongodb.net/sessions?retryWrites=true&w=majority`;

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