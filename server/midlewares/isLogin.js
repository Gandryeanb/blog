const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const isLogin = (req,res,next) => {

    let authorization = req.headers.authorization

    if (authorization) {

        const decoded = jwt.verify(authorization, process.env.JWT_HASH);

        User.find({ email : decoded.email})
        .then(data => {

            if (data.length === 1) {

                req.decoded = decoded
                next()

            } else {
                res.status(403).json({
                    status : `failed`,
                    message : `You need to login first`
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `failed when finding user data`
            })
        })

    } else {
        res.status(403).json({
            status : `failed`,
            message : `You need to login first`
        })
    }

}

module.exports = isLogin