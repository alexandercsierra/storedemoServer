module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
}

const db = require('../data/db-config');

function getAll(){
    return db('categories');
}

function getById(id){
    return db('categories').where({id});
}

function add(cat){
    return db('categories').insert(cat);
}

function update(newCat, id){
    return db('categories').where({id}).update(newCat);
}

function remove(id){
    return db('categories').where({id}).del();
}