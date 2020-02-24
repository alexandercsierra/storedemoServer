module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}

const db = require('../data/db-config');

function getAll(){
    return db('reviews');
}

function getById(id){
    return db('reviews').where({id});
}

function add(cat, id){
    return db('reviews').insert({...cat, product_id: id});
}

function update(newCat, id){
    return db('reviews').where({id}).update(newCat);
}

function remove(id){
    return db('reviews').where({id}).del();
}