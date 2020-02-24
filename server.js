const express = require('express');
const helmet = require('helmet');
const productsRouter = require('./products/productsRouter')
const categoriesRouter = require('./categories/categoriesRouter')
const reviewsRouter = require('./reviews/reviewsRouter')
const productCategoriesRouter = require('./product_categories/productCategoriesRouter')

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/products', productsRouter);
server.use('/categories', categoriesRouter);
server.use('/reviews', reviewsRouter);
server.use('/product_categories', productCategoriesRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message: 'Welcome to my shop'})
})

module.exports = server;