const express = require('express');
const app = express()
const userRouter = require('./routes/users.js')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userModel = require('./models/User')


mongoose.connect('mongodb://localhost:27017/spa',{useNewUrlParser:true})
app.listen(3000,()=>{
    console.log('Listening to port 3000')
})
app.use(morgan('short'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(userRouter)