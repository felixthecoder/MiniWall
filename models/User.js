//importing mongoose schema
const mongoose = require('mongoose')

//creating user schema
const UserSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
        min: 3,
        max: 250
    },
    email:{
        type: String,
        require: true,
        min: 8,
        max: 250
    },
    password:{
        type: String,
        require: true,
        min: 8,
        max: 2500,
    }
})

//exporting user schema
module.exports = mongoose.model('users', UserSchema)
