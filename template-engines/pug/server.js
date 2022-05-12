const Products = require('../../api-restful/api-functions/products');

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('../public'));

app.set('views', './views');
app.set('view engine', 'pug');

const pd = new Products();

app.get('/', (req, res) => {
    res.render('form');
});

app.get('/products', (req, res) => {
    const products = pd.getProducts();

    res.render('products', { products });
});

app.post('/products', (req, res) => {
    const { body } = req;
    const product = pd.postProduct(body);

    res.redirect('/');
});

const PORT = 8080;

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
server.on('error', (err) => console.log(err));

