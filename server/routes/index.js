const Router = require('express')
const router = new Router
const UserRouter = require('./UserRouter')
const CardRouter = require('./CardRouter')
const OperationRouter = require('./OperationRouter')

router.use('/user', UserRouter)
router.use('/card', CardRouter)
router.use('/operation', OperationRouter)

module.exports = router