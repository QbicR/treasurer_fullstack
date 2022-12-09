const Router = require('express')
const router = new Router
const CardController = require('../controllers/CardController')
const auth = require('../middleware/AuthMiddleware')

router.post('/', auth, CardController.create)
router.get('/', auth, CardController.getAll)
router.get('/:id', auth, CardController.getOne)
router.put('/:id', auth, CardController.update)
router.delete('/:id', auth, CardController.delete)

module.exports = router