const express = require('express');
const helmet = require('helmet');
const productsRouter = require('./products/productsRouter')

const server = express();
server.use(helmet());
server.use(express.json());

server.use('/products', productsRouter);

server.get('/', (req, res)=>{
    res.status(200).json({message: 'Welcome to my shop'})
})

module.exports = server;