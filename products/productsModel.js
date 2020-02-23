module.exports = {
    getAll,
    addProduct,
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

function update(product, id){
    return db('products').where({id}).update(product);
}

function remove(id){
    return db('products').where({id}).del();
}

