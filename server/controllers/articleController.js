const Article = require('../models/articleModel')
const dateHelper = require('../helpers/dateHelper')

class ArticleController {

    static findOne(req,res) {
        Article.find({ _id : req.params.id})
        .populate('author')
	.populate({path:'comments', populate: {path: 'commentator '}})
        .then(data => {
            data = dateHelper(data)
            res.status(200).json({
                status : `success`,
                data : data[0]
            })
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `error when find article`
            })
        })
    }

    static createArticle (req,res) {

        let newArticle = {
            title : req.body.title,
            author : req.decoded._id,
            body : req.body.body,
            comment : []
        }

        let article = new Article({
            title : req.body.title,
            author : req.decoded._id,
            body : req.body.body,
            comment : []
        })
        
        article.save()
        .then(data => {
            res.status(201).json({
                status : `success`,
                message : `success when creating article`
            })
        })
        .catch (err => {
            res.status(500).json({
                status : `failed`,
                message : `failed when creating article`
            })
        })
    }

    static deleteArticle (req,res) {

        Article.deleteOne({ _id: req.params.id, author : req.decoded._id }, function (err) {
            if (err) {
                res.status(500).json({
                    status : `failed`,
                    message : `failed when delete article with Id ${req.params.id}`
                })
            } else {
                res.status(200).json({
                    status : `success`,
                    message : `success delete article with Id ${req.params.id}`
                })
            }
          });

    }

    static updateArticle (req,res) {

        let updates = {
            title : req.body.title,
            author : req.decoded._id,
            body : req.body.body
        }

        Article.updateOne({ _id: req.params.id, author : req.decoded._id }, {$set : updates}, (err, result) => {
            if (err) {
                res.status(500).json({
                    status : `failed`,
                    message : `failed when update article`
                })
            } else {
                res.status(200).json({
                    status : `success`,
                    message : `sucess when update article`
                })
            }
        });  

    }

    static findAllArticle(req,res) {

        Article.find()
        .populate('comments')
	.populate('author')
        .then(data => {
            data = dateHelper(data)
            res.status(200).json({
                message : `success`,
                data : data
            })
        })
        .catch(err => {
            res.status(500).json({
                status : `failed`,
                message : `failed when find all articles`
            })
        })

    }

}

module.exports = ArticleController
