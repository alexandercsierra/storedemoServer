const express = require('express');
const Cats = require('./categoriesModel');
const router = express.Router();

router.get('/', (req, res)=>{
    Cats.getAll()
        .then(cats=>res.status(200).json(cats))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.get('/:id', validateCatId, (req, res)=>{
    Cats.getById(req.params.id)
        .then(cats=>res.status(200).json(cats))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.post('/', validateCat, (req, res)=>{
    Cats.add(req.body)
        .then(cat=>res.status(201).json(cat))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.put('/:id', validateCatId, validateCat, (req,res)=>{
    Cats.update(req.body, req.params.id)
        .then(cat => res.status(200).json(cat))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.delete('/:id', validateCatId, (req,res)=>{
    Cats.remove(req.params.id)
        .then(cat=>res.status(200).json(cat))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})




function validateCatId (req, res, next){
    Cats.getById(req.params.id)
        .then(cat=>{
            cat.length > 0 ? next() : res.status(404).json({message:'no category with that id'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'error validating category id'})
        })
}

function validateCat (req, res, next){
    let body = req.body;
    let keys = Object.keys(body);
    if(keys.length === 0){
        res.status(400).json({message:'must enter a category'})
    }
    if (!body.name){
        res.status(400).json({message: 'category must have a name property'})
    }
    next();
}

module.exports = router;