const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req,res) {        

        let newUser = {
            fname : req.body.fname,
            lname : req.body.lname,
            email : req.body.email,
            password : req.body.password
        }

        let user = new User(newUser)
        
        user.save()
        .then(data => {
            res.status(201).json({
                status : `success`,
                message : `creating user success`
            })
        })
        .catch(err => {            
            res.status(500).json({
                status : `failed xxx`,
                message : err
            })
        })
    }

    static login(req,res) {

        User.find({ email : req.body.email})
        .then(data => {
            if (data.length === 1) {

                if (bcrypt.compareSync(req.body.password, data[0].password)) {
                    
                    const token = jwt.sign({ 
                        
                        _id : data[0]._id,
                        fname : data[0].fname,
                        email : data[0].email

                    }, process.env.JWT_HASH);
                    
                    res.status(200).json({
                        status : `success`,
                        message : `login success`,
                        authorization : token,
                    })
                } else {
                    res.status(406).json({
                        status : `failed`,
                        message : `login failed, wrong password or email`
                    })    
                }
                
            } else {
                res.status(403).json({
                    status : `failed`,
                    message : `login failed, user not found`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `error when log-in user`
            })
        })
    }

    static whoIsthis(req,res) {
        User.find({_id : req.decoded._id})
        .then(datas => {
            res.status(200).json({
                status : `success`,
                data : datas[0]
            })
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `you need to login first`
            })
        })
    }
}

module.exports = UserController