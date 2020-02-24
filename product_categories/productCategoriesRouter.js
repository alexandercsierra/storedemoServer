const express = require('express');
const PC = require('./productCategoriesModel');
const router = express.Router();

router.get('/', (req, res)=>{
    PC.getAll()
        .then(revs=>res.status(200).json(revs))
        .catch(err=>{
            console.log(err);
            res.status(500).json({message:err.message})
        })
})

module.exports = router;