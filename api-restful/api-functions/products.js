module.exports = class Products {
    constructor() {
        this.products = [];
    };

    getProducts() {
        if(this.products.length) return this.products;
        return null;
    };

    getProduct(id) {
        const product = this.products.find(p => p.id === id);
        return product;
    };

    postProduct(product) {
        const maxID = this.products.reduce((max, obj) => Math.max(max, obj.id), 0);
        const newProduct = {
            id: maxID + 1,
            ...product
        };

        this.products.push(newProduct);
        return newProduct;
    };

    putProduct(id, body) {
        const product = this.products.find(p => p.id === id);
        
        if(!product) return null;

        const updProduct = {
            ...product,
            ...body
        };

        const index = this.products.indexOf(product);
        this.products.splice(index, 1, updProduct);

        return updProduct;
    };

    deleteProduct(id) {
        const product = this.products.find(p => p.id === id);

        if(!product) return null;

        const index = this.products.indexOf(product);
        this.products.splice(index, 1);

        return product;
    };
}