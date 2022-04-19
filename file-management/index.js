const container = require('./Container');

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

const products = new container('products.txt');

const createProduct = async (container, obj) => {
    const id = await container.save(obj);
    console.log(`Se creo el producto con id ${id}`);
};

const addProducts = async () => {
    for(const product of productsArr){
        await createProduct(products, product);
    }

    console.log('Se crearon los productos');
    const data = await products.getAll();
    console.log(data);
}

addProducts()
    .then(() => {
        return products.getById(1);
    })
    .then((product) => {
        product 
            ? console.log(`Se encontro el producto ${product.id}:`, product) 
            : console.log('No se encontro el producto');
    })
    .then(() => {
        return products.deleteById(1);
    })
    .then(() => {
        console.log('Productos despues de borrar el producto 1');
        return products.getAll();
    })
    .then((data) => {
        console.log(data);
    })
    .then(() => {
        return products.deleteAll();
    })
    .then(() => {
        console.log('Productos despues de borrar todos los productos');
        return products.getAll();
    })
    .then((data) => {
        console.log(data);
    })


