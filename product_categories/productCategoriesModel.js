module.exports = {
    getAll
}

const db = require('../data/db-config');

function getAll(){
    return db('product_categories');
}

