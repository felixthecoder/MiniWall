//importing express libraries
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')

//initializing the body-parser
app.use(bodyParser.json())

//posts route
const postsRoute = require('./routes/posts')
//auth route
const authRoute = require('./routes/auth')

app.use('/api/posts', postsRoute)
app.use('/api/users', authRoute)


//homepage route
app.get('/', (req,res) =>{
    res.send('Homepage')
})

//connecting to Mongo db
mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('Db is now connected!')
})

//creating the server
app.listen(3000, ()=>{
    console.log("You are connected to server......")
})
