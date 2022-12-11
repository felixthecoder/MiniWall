// importing libraries
const express = require('express')
const router = express.Router()
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')

//importing User Schema
const User = require('../models/User')

//importing user validation
const {regValidation, loginValidation} = require('../validations/validation')
const { json } = require('body-parser')

//User registration
router.post('/register', async(req,res)=>{

    // User Validation
    const {error} = regValidation(req.body)
    if(error){
        res.send({message:error['details'][0]['message']})
    }
    
    // User Existance
    const userExists = await User.findOne({email:req.body.email})
    if(userExists){
        return res.status(400).send({message:'User already exists'})
    }

    //Hashing password
    const salt = await bcryptjs.genSalt(5)
    const hashedPassword = await bcryptjs.hash(req.body.password,salt)

    // Code to insert data
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPassword
    })
    try{
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send({message:err})
    }
    
})

//User login
router.post('/login', async(req,res) =>{
    // User Validation
    const {error} = loginValidation(req.body)
    if(error){
        return res.send({message:error['details'][0]['message']})
    }

    // User Existance
    const userExists = await User.findOne({email:req.body.email})
    if(!userExists){
        return res.status(400).send({message:'User does not exist'})
    } 
    
    // Checking user password
    const passwordValidation = await bcryptjs.compare(req.body.password,userExists.password)
    if(!passwordValidation){
        return res.status(400).send({message:'Password is wrong'})
    }
    
    //Generating a jason web token
    const token = jsonwebtoken.sign({_id:userExists.id}, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send({'auth-token':token})
})

//exporting the post router
module.exports = router