const Container = require('../file-management/Container');

const products = new Container("products.txt");

const productsArr = [
    {
        title: 'Producto 1',
        price: 100,
        thumbnail: 'https://via.placeholder.com/150'
    },
    {
        title: 'Producto 2',
        price: 200,
        thumbnail: 'https://via.placeholder.com/150'
    },
    {
        title: 'Producto 3',
        price: 300,
        thumbnail: 'https://via.placeholder.com/150'
    }
];

const addProducts = async () => {
    await products.deleteAll();
    for(const product of productsArr){
        await products.save(product);
    }
}

const getProducts = async () => {
    const data = await products.getAll();
    return data;
}

const getRandomProduct = async () => {
    const data = await products.getAll();
    const randomProduct = data[Math.floor(Math.random() * data.length)];
    return randomProduct;
}

module.exports = {
    addProducts,
    getProducts,
    getRandomProduct
}

