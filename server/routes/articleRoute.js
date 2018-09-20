const route = require('express').Router()
const ArticleController = require('../controllers/articleController')
const isLogin = require('../midlewares/isLogin')

route.get('/detail/:id',ArticleController.findOne)
route.get('/', ArticleController.findAllArticle)
route.post('/', isLogin,ArticleController.createArticle)
route.put('/:id', isLogin,ArticleController.updateArticle)
route.delete('/:id', isLogin,ArticleController.deleteArticle)

module.exports = route