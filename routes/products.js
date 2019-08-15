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
            res.render('products',{data: products})
        }
    })
})

module.exports = router