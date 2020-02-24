const express = require('express');
const Reviews = require('./reviewsModel');
const router = express.Router();

router.get('/', (req, res)=>{
    Reviews.getAll()
        .then(revs=>res.status(200).json(revs))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.get('/:id', validateRevId, (req, res)=>{
    Reviews.getById(req.params.id)
        .then(revs=>res.status(200).json(revs))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

//:id = associated product_id
router.post('/:id', validateRev, (req, res)=>{
    Reviews.add(body, req.params.id)
        .then(rev=>res.status(201).json(rev))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.put('/:id', validateRevId, validateRev, (req,res)=>{
    Reviews.update(req.body, req.params.id)
        .then(rev => res.status(200).json(rev))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

router.delete('/:id', validateRevId, (req,res)=>{
    Reviews.remove(req.params.id)
        .then(rev=>res.status(200).json(rev))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})




function validateRevId (req, res, next){
    Reviews.getById(req.params.id)
        .then(rev=>{
            rev.length > 0 ? next() : res.status(404).json({message:'no review with that id'})
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({message: 'error validating review id'})
        })
}

function validateRev (req, res, next){
    let body = req.body;
    let keys = Object.keys(body);
    if(keys.length === 0){
        res.status(400).json({message:'must enter a review'})
    }
    if (!body.rating){
        res.status(400).json({message: 'review must have a star rating'})
    }
    next();
}

module.exports = router;