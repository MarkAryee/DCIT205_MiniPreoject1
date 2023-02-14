const User = require('../modules/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
    })

    let user = new User ({
        name: req.body.name,
        id: req.body.id
    })
    user.save()
    .then( user => {
        req.json({
            message: "User Added Successfully"
        })
    })
    .catch(error => {
        message: "Error"
    })
    module.exports = {
        register
    }
}