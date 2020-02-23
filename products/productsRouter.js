const express = require('express');
const Products = require('./productsModel');
const router = express.Router();


router.get('/', (req, res)=>{
    Products.getAll()
        .then(products => res.status(200).json(products))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
    
})

router.get('/:id', validateProductId, (req, res)=>{
    Products.getById(req.params.id)
        .then(product => res.status(200).json(product))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
})

router.post('/', validateProduct, (req, res)=>{
    Products.addProduct(req.body)
        .then(product => res.status(201).json(product))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
    
})


router.put('/:id', validateProductId, validateProduct, (req, res)=>{
    Products.update(req.body, req.params.id)
        .then(product=>res.status(200).json(product))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
})

router.delete('/:id', validateProductId, (req, res)=>{
    Products.remove(req.params.id)
        .then(removed=>res.status(200).json(removed))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: err.message})
        })
})


//validation middleware
function validateProductId (req, res, next){
    Products.getById(req.params.id)
        .then(product=>{
            product.length > 0 ? next() : res.status(404).json({message: 'product with that id does not exist'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:'error validating product id'})
        })
}

function validateProduct (req, res, next){
    let body = req.body;
    let keys = Object.keys(body);
    if (keys.length === 0){
        return res.status(400).json({message: 'need a product'})
    }
    if (!body.name || !body.image_url || !body.description || !body.price || !body.quantity){
        return res.status(400).json({message: 'every product needs a name, image_url, description, price, and quantity'})
    }
    next();
}

module.exports=router;