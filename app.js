const express = require('express');
const app = express()
const userRouter = require('./routes/users.js')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userModel = require('./models/User')

mongoose.connect('mongodb://localhost:27017/spa',{useNewUrlParser:true})

app.use(morgan('short'))
app.set('view engine', 'ejs');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });
// app.use(userRouter)
app.get('/getusers',(req, res) => {
    console.log('get /allusers')

    userModel.find((err, result) => {
        if (err) {
            throw err
        }
        else {
        console.log(result)
        res.sendStatus(200).json({
            name: result.username,
            password: result.password
        })
        }
    })
    res.end()
})
app.listen(3000,()=>{
    console.log('Listening to port 3000')
})

