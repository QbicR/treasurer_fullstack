const { Card } = require('../models/models')

class CardController {
    async create(req, res) {
        try {
            const { name, type, creationDate, value, userId } = req.body
            const card = await Card.create({ name, type, creationDate, value, userId })
            return res.json(card)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async getAll(req, res) {
        try {
            const { userId } = req.query
            let cards
            if (userId) {
                cards = await Card.findAll({
                    where: { userId },
                })
            } else {
                cards = await Card.findAll()
            }
            return res.json(cards)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const card = await Card.findOne({
                where: { id }
            })
            return res.json(card)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { value } = req.body
            const сard = await Card.findOne(
                { where: { id: id } }
            )
            const updatedCard = await сard.update(
                { value: Number(value) }
            )
            return res.json(updatedCard.dataValues)
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
            const card = await Card.findOne({
                where: { id }
            })
            if (card) {
                await Card.destroy({
                    where: { id }
                })
            } else {
                return res.json('Карта не найдена')
            }
            const cards = await Card.findAll(
                { where: userId }
            )
            return res.json(cards)
        } catch (e) {
            res.status(500).json({
                message: 'На сервере произошла ошибка. Попробуйте позже.'
            })
        }
    }
}

module.exports = new CardController()