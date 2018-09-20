const route = require('express').Router()
const UserController = require('../controllers/userController')
const isLogin = require('../midlewares/isLogin')

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.get('/data', isLogin, UserController.whoIsthis)

module.exports = route