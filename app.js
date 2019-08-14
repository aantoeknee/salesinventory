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

const {
    PORT = process.env.PORT || 3000,
    SESS_NAME = 'tan',
    SESS_SECRET = 'quietshh'
} = process.env

mongoose.connect(process.env.DB_URI,{useNewUrlParser:true})
app.listen(PORT,()=>{
    console.log('Listening to port 3000')
})
app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    cookie: {
        maxAge: 10000,
        sameSite: true,
    }
}))
app.use(morgan('short'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(userRouter)
