//will contain all user routes..
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require('../models/User')


router.get('/login',(req, res) => {
    console.log('get /users')
    res.render('login')
})

router.get('/getusers',(req, res, next) => {
    res.setHeader('Content-Type', 'application/json')
    userModel.find((err, users) => {
        console.log('success')
    })
})

router.get('/register', (req, res) => {
    console.log('Register Page...')
    res.render('register',{title: 'Register'})
})

router.post('/createuser', (req, res) => {

})

module.exports = router