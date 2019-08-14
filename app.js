const express = require('express');
const app = express()
const userRouter = require('./routes/users.js')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const cookieParser = require('cookie-parser')
const session = require('express-session')

require('dotenv').config()

SESS_NAME = 'tan'
SESS_SECRET = 'quietshh'
EXPIRETIME = 1000 * 60 * 60 * 2

mongoose.connect(process.env.DB_URI + process.env.DB_NAME,{useNewUrlParser:true},(err) => {
    console.log('Connecting to ' + process.env.DB_URI + process.env.DB_NAME)
})
app.listen(process.env.PORT,()=>{
    console.log('Listening to port ' + process.env.PORT)
})
app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: EXPIRETIME,
        sameSite: true,
    }
}))
app.use(morgan('short'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(userRouter)
