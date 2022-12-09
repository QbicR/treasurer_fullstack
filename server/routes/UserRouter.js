const Router = require('express')
const router = new Router
const UserController = require('../controllers/UserController')
const auth = require('../middleware/AuthMiddleware')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/:id', auth, UserController.getOne)
router.put('/:id', auth, UserController.update)

module.exports = router