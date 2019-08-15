const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const productModel = require('../models/Products')


router.get('/',(req, res) => {
    productModel.find((err,products) => {
        console.log(products)
        if(err) {
            console.log(err)
        } else {
            // res.render('products',{data: products})
             res.json({
                 data: products,
                 next: null,
                 previous: null,
                 page: 1
             });
        }
    })
})

router.post('/createproduct', (req, res) => {
    console.log('creating product')
    var newProduct = new productModel(req.body)

});

module.exports = router