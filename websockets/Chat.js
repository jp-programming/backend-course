const fsPromises = require('fs/promises');

module.exports = class Chat {
    constructor(filename){
        this.dir = './files';
        this.root = `${this.dir}/${filename}`;
    };

    async save(obj){
        const arr = await this.getAll();

        if(!arr.length){
            try {
                await fsPromises.mkdir(this.dir);
                await fsPromises.writeFile(this.root, JSON.stringify(
                    [{ ...obj }], null, 2
                ));
            } catch (error) {
                console.log('No se pudo crear el archivo', error.code);
            }
        } else {
            const newObj = { ...obj };
            arr.push(newObj);

            try {
                await fsPromises.writeFile(this.root, JSON.stringify(arr, null, 2));
            } catch (error) {
                console.log('No se pudo escribir el archivo', error.code);
            }
        }
    };

    async getAll(){
        try {
            const data = await fsPromises.readFile(this.root);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    };
};