const express = require('express');
const app = express()
const userRouter = require('./routes/users.js')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')


mongoose.connect('mongodb://localhost:27017/spa',{useNewUrlParser:true})
app.listen(3000,()=>{
    console.log('Listening to port 3000')
})
app.use(session({secret: 'iloveuit'}))
app.use(morgan('short'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(userRouter)
