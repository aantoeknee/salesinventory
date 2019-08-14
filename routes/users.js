//will contain all user routes..
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const userModel = require('../models/User')


router.get('/',(req, res) => {
    if (req.session.username) {
         res.redirect('/home');
    }
    else {
         res.redirect('/login');
    }
})
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
            req.session.username = req.body.username
            // res.render('home', {user: users[0].username});
             res.redirect('/home');
         } 
        else { console.log('else') }
    })
})

router.get('/register', (req, res) => {
    console.log('Register Page...')
    res.render('register',{title: 'Register'})
})

router.get('/home', (req, res) => {
    if(req.session.username) {
        res.render('home',{user:req.session.username})
    }
    else {
        res.redirect('/login');
    }
})

router.post('/createuser', (req, res) => {
    var newUser = new userModel(req.body)
    userModel.find({username: req.body.username},(err, user) => {
        if (user.length === 0) {
            newUser.save((err, user) => {
                console.log('successfully added')
                res.redirect('/login')
            })
        } else {
             res.json({
                 message:"User already taken"
             });
             res.redirect('/register')
        }
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.negotiate(err)
        }
         res.redirect('/login');
    })
})
module.exports = router