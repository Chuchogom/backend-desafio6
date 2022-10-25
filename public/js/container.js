const fs = require('fs');

class Container{
    constructor(file){
        this.file = file;
    }

    async save(product){
        let objProduct = await this.getAll();
        objProduct.push(product);
        await fs.promises.writeFile(this.file,JSON.stringify(objProduct));
    }
    
    async getAll(){
        let products = await fs.promises.readFile(this.file);
        let objProduct = JSON.parse(products);
        return objProduct;
    }

    async getById(id){
        let products = await this.getAll();
        let returnedProduct = await products.find((prod) => prod.id == id);
        console.log(returnedProduct);
        return returnedProduct;
    }

    async deleteById(id){
        let products = await this.getAll();
        let newList = products.filter((prod) => prod.id !== id);
        console.log(newList);
        await fs.promises.writeFile(this.file,JSON.stringify(newList));
    }

    async deleteAll(){
        await fs.promises.writeFile(this.file,'[]');
    }

    async getLength(){
        let list = await this.getAll();
        return await list.length;
    }
}

module.exports = Container;