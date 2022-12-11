//Importing Libraries
const joi = require('joi')

//Registration Validation
const regValidation = (data) =>{
    const schemaValidation = joi.object({
        username: joi.string().required().min(3).max(250),
        email: joi.string().required().min(8).max(250),
        password: joi.string().required().min(8).max(2500)
    })
    return schemaValidation.validate(data)
}

//Login Validation
const loginValidation = (data) =>{
    const schemaValidation = joi.object({
        email: joi.string().required().min(8).max(250),
        password: joi.string().required().min(8).max(2500)
    })
    return schemaValidation.validate(data)
}

module.exports.regValidation = regValidation
module.exports.loginValidation = loginValidation