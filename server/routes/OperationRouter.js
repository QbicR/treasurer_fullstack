const Router = require('express')
const router = new Router
const OperationController = require('../controllers/OperationController')
const auth = require('../middleware/AuthMiddleware')

router.post('/', auth, OperationController.create)
router.get('/', auth, OperationController.getAll)
router.get('/:id', auth, OperationController.getOne)
router.delete('/:id', auth, OperationController.delete)

module.exports = router