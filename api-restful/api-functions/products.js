const products = [];

module.exports = {
    getProducts: () => {
        if(products.length) return products;
        return null;
    },
    getProduct: (id) => {
        const product = products.find(p => p.id === id);
        return product;
    },
    postProduct: (product) => {
        const maxID = products.reduce((max, obj) => Math.max(max, obj.id), 0);
        const newProduct = {
            id: maxID + 1,
            ...product
        };

        products.push(newProduct);
        return newProduct;
    },
    putProduct: (id, body) => {
        const product = products.find(p => p.id === id);
        
        if(!product) return null;

        const updProduct = {
            ...product,
            ...body
        };

        products.splice(products.indexOf(product), 1, updProduct);

        return updProduct;
    },
    deleteProduct: (id) => {
        const product = products.find(p => p.id === id);

        if(!product) return null;

        const index = products.indexOf(product);
        products.splice(index, 1);

        return product;
    }
};