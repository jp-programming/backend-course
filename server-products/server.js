const express = require('express');
const res = require('express/lib/response');
const { 
    addProducts,
    getProducts,
    getRandomProduct 
} = require('./index');

addProducts();

const app = express();

const PORT = 8080;

app.listen(PORT, () => 
    console.log(`Server running at http://localhost:${PORT}/`)
);

app.get('/', (req, res) => {
    res.send(`
    <div>
        <h1>Express Server</h1>
        <p>/products : Get all products from the file</p>
        <p>/randomProducts : Get a random product from the file</p>
    </div>`);
});

app.get('/products', async (req, res) => {
    res.send(await getProducts());
});

app.get('/randomProduct', async (req, res) => {
    res.send(await getRandomProduct());
});