const Products = require('./api-functions/products');

const express = require('express');
const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const pd = new Products();

router.get('/', (req, res) => {
    const products = pd.getProducts();

    if(products) res.json({ products: products });
    else res.json({ message: 'No products found' });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = pd.getProduct(Number(id));

    if(product) res.json({ product: product });
    else res.json({ message: 'No product found' })
});

router.post('/', (req, res) => {
    const { body } = req;
    const product = pd.postProduct(body);

    res.json({ newProduct: product });
});

router.put('/:id', (req, res) => {
    const { body } = req;
    const { id } = req.params;

    const product = pd.putProduct(Number(id), body);

    if(product) res.json({ updatedProduct: product });
    else res.json({ message: 'No product found' });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params; 
    const product = pd.deleteProduct(Number(id));

    if(product) res.json({ deletedProduct: product });
    else res.json({ message: 'No product found' });
});

app.use('/api/products', router);

const PORT = 8080;

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

server.on('error', (err) => console.log(err))