module.exports = {
    getAll,
    addProduct,
    addToCats,
    getById,
    update,
    remove
}

const db = require('../data/db-config');

function getAll () {
    return db('products');
}

function getById (id) {
    return db('products').where({id});
}

function addProduct(product){
    return db('products').insert(product);
}

function addToCats(product, catid){
    const pc = {
        product_id: product,
        category_id: catid
    }
    console.log(pc);
    return db('product_categories').insert(pc);
}

function update(product, id){
    return db('products').where({id}).update(product);
}

function remove(id){
    return db('products').where({id}).del();
}

