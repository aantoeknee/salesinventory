//will contain all user routes..
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require('../models/User')


router.get('/login',(req, res) => {
    console.log('get /users')
    res.render('login')
})

router.post('/user',(req, res, next) => {
    var username = req.body.username
    var password = req.body.password

    userModel.find({username: username, password: password}, (err, users) => {
        if (err || users.length === 0)  { 
            console.log('error') 
             res.json({
                 message: "Invalid User"
             });
        }
        else if (users) { 
            res.render('home', {user: users[0].username});
         } 
        else { console.log('else') }
    })
})

router.get('/register', (req, res) => {
    console.log('Register Page...')
    res.render('register',{title: 'Register'})
})

router.post('/createuser', (req, res) => {
    var newUser = new userModel(req.body)

    newUser.save((err, user) => {
        console.log('successfully added')
        res.sendStatus(200)
        res.end()
    })

})

module.exports = router