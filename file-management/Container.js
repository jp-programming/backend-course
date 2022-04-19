const fsPromises = require('fs/promises');

module.exports = class Container {
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
                    [{...obj, id: 1}], null, 2
                ));

                return 1;
            } catch (error) {
                console.log('No se pudo crear el archivo', error.code);
            }
        }

        const maxID = arr.reduce((max, obj) => Math.max(max, obj.id), 0);
        const newObj = {...obj, id: maxID + 1};
        arr.push(newObj);

        try {
            await fsPromises.writeFile(this.root, JSON.stringify(arr, null, 2));
            return newObj.id;
        } catch (error) {
            console.log('No se pudo escribir el archivo', error.code);
        }
        
        return;
    };

    async getById(id){
        const data = await this.getAll();
        return data.find(obj => obj.id === id) || null;
    };

    async getAll(){
        try {
            const data = await fsPromises.readFile(this.root);
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    };

    async deleteById(id){
        const arr = await this.getAll();
        const index = arr.findIndex(obj => obj.id === id);

        if(index === -1){
            return;
        }

        arr.splice(index, 1);
        await fsPromises.writeFile(this.root, JSON.stringify(arr, null, 2));
    };

    async deleteAll(){
        const arr = await this.getAll();

        if(!arr.length){
            return;
        }

        await fsPromises.unlink(this.root);
    };
};