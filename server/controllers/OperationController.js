const { Operation } = require('../models/models')
const ApiError = require('../errors/ApiError')

class OperationController {
    async create(req, res) {
        try {
            const { type, creationDate, category, value, comment, cardId, cardName, userId } = req.body
            const operation = await Operation.create({ type, creationDate, category, value, comment, cardId, cardName, userId })
            return res.json(operation)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async getAll(req, res) {
        try {
            let { userId, cardId, type } = req.query
            let operations
            if (!userId && cardId && !type) {
                operations = await Operation.findAll({
                    where: { cardId }, order: [
                        ['id', 'DESC']
                    ]
                })
            } if (userId && !cardId && !type) {
                operations = await Operation.findAll({
                    where: { userId }, order: [
                        ['id', 'DESC']
                    ]
                })
            } if (userId && cardId && !type) {
                operations = await Operation.findAll({
                    where: { cardId, userId }, order: [
                        ['id', 'DESC']
                    ]
                })
            } if (!userId && !cardId && type) {
                operations = await Operation.findAll({
                    where: { type }, order: [
                        ['id', 'DESC']
                    ]
                })
            } if (userId && !cardId && type) {
                operations = await Operation.findAll({
                    where: { userId, type }, order: [
                        ['id', 'DESC']
                    ]
                })
            } if (userId && cardId && type) {
                operations = await Operation.findAll({
                    where: { cardId, userId, type }, order: [
                        ['id', 'DESC']
                    ]
                })
            }
            return res.json(operations)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const operation = await Operation.findOne({
                where: { id }
            })
            return res.json(operation)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            const userId = req.query
            const operation = await Operation.findOne({
                where: { id }
            })
            if (operation) {
                await Operation.destroy({
                    where: { id }
                })
            } else {
                return res.json('Операция не найдена')
            }
            const operations = await Operation.findAll(
                { where: userId }
            )
            return res.json(operations)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }
}

module.exports = new OperationController()