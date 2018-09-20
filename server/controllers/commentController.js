const Komment = require('../models/commentModel')

class CommentController {

    static createComment (req,res) {

        let newKomment = { 
            body : req.body.body,
            commentator : req.decoded._id,
            articleId : req.params.id
        }

        let komment = new Komment (newKomment)

        komment.save()
        .then(data => {
            res.status(201).json({
                status : `success`,
                message : `success creating comment`
            })
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `failed creating comment`,
                err : err
            })
        })

    }

    static deleteComment (req,res) {

        Komment.remove({ _id : req.params.id, commentator : req.decoded._id }, function (err, result){
            if (!err) {
                res.status(200).json({
                    status : `success`,
                    message : `deleteing comment success`
                })
            } else {
                res.status(500).json({
                    status : `failed`,
                    message : `deleteing comment failed`,
                    err : err
                })
            }
        })

    }

    static findComment (req,res) {
        
        Komment.find({articleId : req.params.id})
        .then(data => {
            res.status(200).json({
                status: 'success',
                data : data
            })            
        })
        .catch(err => {
            res.status(500).json({
                status: 'failed',
                message : 'failed when find all comment'
            })
        })

    }

}

module.exports = CommentController